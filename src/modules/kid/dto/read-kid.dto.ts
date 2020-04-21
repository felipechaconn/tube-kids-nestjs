import  {IsString, IsNotEmpty, IsNumber} from 'class-validator';
import { Exclude,Expose,Type} from 'class-transformer';
import { ReadUserDto } from 'src/modules/user/dto';

@Exclude()
export class ReadKidDto {
    @Expose()
    @IsNumber()
    readonly id_kid: number;

    @Expose()
    @IsString()
    readonly firstName_kid: string;

    @Expose()
    @IsString()
    readonly username_kid: string;

    @Expose()
    @IsString()
   readonly birthday_kid: Date;

    @Expose()
    @IsString()
    readonly pin_kid: number;
    
    @Expose()
    @Type(type => ReadUserDto)
    readonly creator: ReadUserDto;
}