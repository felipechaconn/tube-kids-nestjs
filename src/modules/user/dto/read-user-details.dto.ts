import { IsNumber, IsEmail, IsString } from "class-validator";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class ReadUserDetailsDto {
    
    @Expose()
    @IsString()
    readonly firstName_user: string;

    @Expose()
    @IsString()
    readonly lastName_user: string;

    @Expose()
    @IsString()
    readonly country_user: string;

    @Expose()
    @IsString()
    readonly phone_user: string;
}