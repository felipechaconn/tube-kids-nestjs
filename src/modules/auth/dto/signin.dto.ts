import { IsNotEmpty, IsString } from 'class-validator';

export class SigninDto {
  @IsNotEmpty()
  @IsString()
  email_user: string;

  @IsNotEmpty()
  @IsString()
  password_user: string;
}
