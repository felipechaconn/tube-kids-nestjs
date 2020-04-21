import { IsNotEmpty } from 'class-validator';

export class UserDTO {
  @IsNotEmpty()
  id_user: number;

  @IsNotEmpty()
  email_user: string;

  @IsNotEmpty()
  firstName_user: string;

}
