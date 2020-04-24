export interface IJwtPayload {
    email: string;
    firstName: string;
    phoneUser: string;
    iat?:Date;
}