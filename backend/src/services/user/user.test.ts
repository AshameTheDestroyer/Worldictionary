import { UserModel } from "./user.model";
import { Gender, Role } from "../../../../src/schemas/UserSchema";

test("should create and delete a user", async () => {
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

    const foundUser = await UserModel.findById(_id);
    expect(foundUser).not.toBeNull();
    expect(foundUser?.username).toBe("@testuser");

    await UserModel.updateOne({ _id }, { "first-name": "Updated" });
    const updatedUser = await UserModel.findById(_id);
    expect(updatedUser?.["first-name"]).toBe("Updated");

    await UserModel.deleteOne({ _id });
    const deletedUser = await UserModel.findById(_id);
    expect(deletedUser).toBeNull();
}, 20000);
