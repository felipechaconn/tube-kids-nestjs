import { Repository, Entity, EntityRepository, getConnection } from 'typeorm';
import { User } from '../user/user.entity';
import { SignupDto } from './dto';
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
      phone_user,
    } = signupDto;

    const user = new User();
    user.email_user = email_user;
    user.firstName_user = firstName_user;
    user.lastName_user = lastName_user;
    user.birthday_user = birthday_user;
    user.phone_user = phone_user;
    user.vcode = token;
    console.log('token',token)
    const salt = await genSalt(10);
    user.password_user = await hash(password_user, salt);
    

    await user.save();
  }
}
