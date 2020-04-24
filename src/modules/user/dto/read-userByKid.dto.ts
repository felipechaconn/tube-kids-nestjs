import { IsNumber, IsEmail, IsString } from "class-validator";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class ReadUserByKidDto {
    @Expose()
    readonly id_user: number;

    @Expose()
    @IsString()
    readonly firstName_user: string;
}