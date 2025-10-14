import { Handler } from "express";
import { connection, mongo } from "mongoose";

export const GetFile: Handler = async (request, response) => {
    try {
        const { id } = request.params;

        const bucket = new mongo.GridFSBucket(connection.db, {
            bucketName: "uploads",
        });

        const downloadStream = bucket.openDownloadStream(
            new mongo.ObjectId(id)
        );

        downloadStream.on("data", (chunk) => response.write(chunk));
        downloadStream.on("error", () =>
            response.status(404).send("File isn't found.")
        );
        downloadStream.on("end", () => response.end());
    } catch (error) {
        console.log(error);
        return response.status(500).send(error);
    }
};

export const PostFile: Handler = async (request, response) => {
    try {
        if (request.file == null) {
            return response
                .status(400)
                .json({ message: "No file was uploaded." });
        }

        const { originalname, mimetype, buffer } = request.file;

        const bucket = new mongo.GridFSBucket(connection.db, {
            bucketName: "uploads",
        });

        const uploadStream = bucket.openUploadStream(originalname, {
            contentType: mimetype,
        });

        uploadStream.end(buffer);

        uploadStream.on("finish", () =>
            response.status(201).json({
                fileID: uploadStream.id,
                message: "File uploaded successfully!",
            })
        );

        uploadStream.on(
            "error",
            (error) => (
                console.log(error),
                response.status(500).json({ message: "Failed to upload file." })
            )
        );
    } catch (error) {
        console.log(error);
        return response.status(500).send(error);
    }
};
