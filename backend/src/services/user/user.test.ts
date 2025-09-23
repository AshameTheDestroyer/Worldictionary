import { UserModel } from "./user.model";
import { Gender, Role } from "../../../../src/schemas/UserSchema";

UserModel.create({
    role: Role.admin,
    gender: Gender.male,
    password: "Abc123!@",
    "first-name": "Hashem",
    "last-name": "Wannous",
    birthday: new Date(2003, 2, 15),
    username: "@ashamethedestroyer",
    email: "hashem.wannous@gmail.com",
});
