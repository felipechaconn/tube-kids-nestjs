import { IsNumber, IsEmail, IsDate } from "class-validator";
import { ReadUserDetailsDto } from "./read-user-details.dto";
import { Type } from "class-transformer";
import { type } from "os";

export class ReadUserDto {
    @IsNumber()
    readonly id_user: number;

    @IsEmail()
    readonly email_user: string;

    @IsDate()
    readonly birthday_user: string;

    @Type(type => ReadUserDetailsDto)
    readonly details: ReadUserDetailsDto;
}