import { IsNotEmpty, IsString } from 'class-validator';


export class VideoDTO {

  @IsNotEmpty()
  id_video: number;

  @IsNotEmpty()
  @IsString()
  name_video: string;

  @IsNotEmpty()
  @IsString()
  description_video: string;

  @IsNotEmpty()
  @IsString()
  link_video: string;

}
