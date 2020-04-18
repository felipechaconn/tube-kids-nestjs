import  {IsString, IsNotEmpty} from 'class-validator';
import { User } from 'src/modules/user/user.entity';

export class CreateVideoDto {

    @IsNotEmpty()
    @IsString()
    readonly name_video: string;

    @IsString()
    readonly description_video: string;

    @IsString()
    readonly link_video: string;

    @IsNotEmpty()
    readonly creator: User;
}