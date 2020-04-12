import { RoleType } from "../role/roletype.enum";

export interface IJwtPayload {
    email: string;
    firstName: string;
    role: string;
    iat?:Date;

}