import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class SigninKidDto {
  @IsNotEmpty()
  @IsString()
  username_kid: string;

  @IsNotEmpty()
  @IsString()
  pin_kid: string;
}
