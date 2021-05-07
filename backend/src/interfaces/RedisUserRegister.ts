import { Role } from "../entities/User";

export default interface RedisUserRegister {
    email: string;
    role: Role;
}