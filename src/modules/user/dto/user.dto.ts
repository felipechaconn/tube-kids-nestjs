import { IsNotEmpty } from 'class-validator';
import { RoleType } from '../../role/roletype.enum';

export class UserDTO {
  @IsNotEmpty()
  id_user: number;

  @IsNotEmpty()
  email_user: string;

  @IsNotEmpty()
  firstName_user: string;

  @IsNotEmpty()
  roles: RoleType[];
}
