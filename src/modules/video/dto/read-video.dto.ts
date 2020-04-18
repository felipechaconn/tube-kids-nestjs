import  {IsString, IsNotEmpty, IsNumber} from 'class-validator';
import { Exclude,Expose,Type} from 'class-transformer';
import { UserDTO } from 'src/modules/user/dto/user.dto';
import { ReadUserDto } from 'src/modules/user/dto';

@Exclude()
export class ReadVideoDto {
    @Expose()
    @IsNumber()
    readonly id_video: number;

    @Expose()
    @IsString()
    readonly name_video: string;

    @Expose()
    @IsString()
    readonly description_video: string;

    @Expose()
    @IsString()
    readonly link_video: string;

    @Expose()
    @Type(type => ReadUserDto)
    readonly creator: ReadUserDto;
}