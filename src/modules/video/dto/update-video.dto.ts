import  {IsString, IsNotEmpty} from 'class-validator';

export class UpdateVideoDto {
    @IsString()
    readonly name_video: string;

    @IsString()
    readonly description_video: string;

    @IsString()
    readonly link_video: string;
}