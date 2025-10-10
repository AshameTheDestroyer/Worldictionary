import { UserModel } from "./user.model";
import { Gender, Role } from "../../../../src/schemas/UserSchema";

describe("User CRUD Operations", () => {
    test("Create, Read, Update, Delete Single User", async () => {
        // Create
        const { _id } = await UserModel.create({
            role: Role.admin,
            gender: Gender.male,
            "last-name": "User",
            "first-name": "Test",
            password: "Abc123!@",
            username: "@testuser",
            email: "test.user@gmail.com",
            birthday: new Date(2003, 2, 15),
        });

        // Read
        const foundUser = await UserModel.findById(_id);
        expect(foundUser).not.toBeNull();
        expect(foundUser?.username).toBe("@testuser");

        // Update
        await UserModel.updateOne({ _id }, { "first-name": "Updated" });
        const updatedUser = await UserModel.findById(_id);
        expect(updatedUser?.["first-name"]).toBe("Updated");

        // Delete
        await UserModel.deleteOne({ _id });
        const deletedUser = await UserModel.findById(_id);
        expect(deletedUser).toBeNull();
    }, 20000);

    test("Get All Users", async () => {
        // Create two users
        await UserModel.create([
            {
                role: Role.admin,
                gender: Gender.male,
                "last-name": "User1",
                "first-name": "Test1",
                password: "Abc123!@",
                username: "@testuser1",
                email: "test.user1@gmail.com",
                birthday: new Date(2000, 1, 1),
            },
            {
                role: Role.user,
                gender: Gender.female,
                "last-name": "User2",
                "first-name": "Test2",
                password: "Abc123!@",
                username: "@testuser2",
                email: "test.user2@gmail.com",
                birthday: new Date(2001, 2, 2),
            },
        ]);

        // Get all users
        const users = await UserModel.find({});
        expect(Array.isArray(users)).toBe(true);
        expect(users.length).toBeGreaterThanOrEqual(2);
    });

    test("Delete All Users", async () => {
        // Delete all users
        await UserModel.deleteMany({});
        const users = await UserModel.find({});
        expect(users.length).toBe(0);
    });
});
