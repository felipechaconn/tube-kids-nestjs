import { IsNotEmpty, IsString } from 'class-validator';

export class SigninKidDto {
  @IsNotEmpty()
  @IsString()
  username_kid: string;

  @IsNotEmpty()
  @IsString()
  pin_Kid: string;
}
