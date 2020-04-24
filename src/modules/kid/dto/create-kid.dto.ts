import  {IsString, IsNotEmpty, IsDate, IsNumber} from 'class-validator';
import { User } from 'src/modules/user/user.entity';

export class CreateKidDto {

    @IsNotEmpty()
    @IsString()
    firstName_kid: string;

    @IsString()
    username_kid: string;

    @IsDate()
    birthday_kid: Date;

    @IsString()
    pin_kid: string;


    @IsNotEmpty()
    readonly creator: User;
}