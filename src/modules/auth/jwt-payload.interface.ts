import { RoleType } from "../role/roletype.enum.";

export interface IJwtPayload {
    email: string;
    firstName: string;
    //roles: RoleType[];
    iat?:Date;

}