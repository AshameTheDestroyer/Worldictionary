import express from "express";
import { Task } from "../models/task";

export const TaskRouter = express.Router();

TaskRouter.get("/", async (_, response) => {
    try {
        const tasks = await Task.find();
        response.json(tasks);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

TaskRouter.post("/", async (request, response) => {
    const { title } = request.body;

    if (title == null) {
        return response.status(400).json({ error: "Task title is required" });
    }

    try {
        const newTask = new Task({ title });
        await newTask.save();
        response.status(201).json(newTask);
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ error: error.message });
    }
});

TaskRouter.delete("/:id", async (request, response) => {
    try {
        const { id } = request.params;
        await Task.findByIdAndDelete(id);
        response.json({ message: "Task deleted" });
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

TaskRouter.put("/:id", async (request, response) => {
    try {
        const { id } = request.params;

        const updatedTask = await Task.findByIdAndUpdate(id, request.body, {
            new: true,
        });
        response.json(updatedTask);
    } catch {
        response.status(500).json({ error: "Error updating task" });
    }
});
