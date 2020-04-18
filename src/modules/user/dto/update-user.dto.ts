import { IsEmail, IsString } from "class-validator";

export class UpdateUserDto {
    @IsEmail()
    readonly  email_user: string;

    @IsString()
    readonly phone_user: string;
}