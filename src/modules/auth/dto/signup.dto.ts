import { IsNotEmpty, IsString } from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  @IsString()
  email_user: string;

  @IsNotEmpty()
  @IsString()
  password_user: string;

  @IsNotEmpty()
  @IsString()
  birthday_user: Date;

  @IsNotEmpty()
  @IsString()
  firstName_user: string;

  @IsNotEmpty()
  @IsString()
  lastName_user: string;
}
