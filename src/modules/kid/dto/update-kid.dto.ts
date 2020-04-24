import  {IsString, IsNotEmpty} from 'class-validator';
import { User } from 'src/modules/user/user.entity';

export class UpdateKidDto {
    @IsString()
    readonly firstName_kid: string;

    @IsString()
    readonly username_kid: string;

    @IsString()
    readonly pin_kid: string;

     creator? : User;
}