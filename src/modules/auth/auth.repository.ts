import { Repository, Entity, EntityRepository, getConnection } from 'typeorm';
import { User } from '../user/user.entity';
import { SignupDto } from './dto';
import { RoleRepository } from '../role/role.repository';
import { Role } from '../role/role.entity';
import { RoleType } from '../role/roletype.enum';
import { genSalt, hash } from 'bcrypt';


@EntityRepository(User)
export class AuthRepository extends Repository<User> {

  //constants
  async signup(signupDto: SignupDto, token:string) {
    const {
      email_user,
      firstName_user,
      lastName_user,
      birthday_user,
      password_user,
    } = signupDto;

    const user = new User();
    user.email_user = email_user;
    user.firstName_user = firstName_user;
    user.lastName_user = lastName_user;
    user.birthday_user = birthday_user;
    user.vcode = token;
    console.log('token',token)
    const salt = await genSalt(10);
    user.password_user = await hash(password_user, salt);
    const roleRepository: RoleRepository = getConnection().getRepository(Role);
    const defaultRole: Role = await roleRepository.findOne({
      where: { name: RoleType.ADULT },
    });
    
    user.roles = defaultRole;

    await user.save();
  }
}
