import { UserModel } from "./user.model";
import { Gender, Role } from "../../../../src/schemas/UserSchema";

async function Test() {
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

    await UserModel.deleteOne({ _id });
}

Test();
