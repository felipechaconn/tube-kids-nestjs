import { RoleType } from "../role/roletype.enum.";

export interface IJwtPayload {
    id_user: number;
    email_user: string;
    //roles: RoleType[];
    iat?:Date;

}