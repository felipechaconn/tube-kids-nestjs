import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { SigninDto, SignupDto } from './dto';
import { User } from '../user/user.entity';
import { compare } from 'bcrypt';
import { IJwtPayload } from './jwt-payload.interface';
import { RoleType } from '../role/roletype.enum';
import { LocalStorage } from 'node-localstorage';
import { from } from 'rxjs';
import { uid } from 'rand-token';
import { ConfigService } from 'src/config/config.service';
import { config } from 'dotenv/types';
import { Configuration } from 'src/config/config.keys';
import { throws } from 'assert';

@Injectable()
export class AuthService {
  constructor(
    private readonly _configService: ConfigService,
    @InjectRepository(AuthRepository)
    private readonly _authRepository: AuthRepository,
    private readonly _jwtService: JwtService,
  ) {}
  public async getUserAge(date: Date) {
    const today = new Date();
    let userAgeDate = new Date(date);
    let age = today.getFullYear() - userAgeDate.getFullYear();
    const months = today.getMonth() - userAgeDate.getMonth();
    if (
      months < 0 ||
      (months === 0 && today.getDate() < userAgeDate.getDate())
    ) {
      age--;
    }
    return age;
  }

  public async getRolByAge(age:number) {
    if (age >= 18) {
      return RoleType.ADULT;
    } else {
      return RoleType.KID;
    }
  }

  public async sendMail(emailTo: string, tokenVerfiy: string) {
    //email
    const sgMail = require('@sendgrid/mail');
    //Este es el api de SENDGRID
    const ApiKey = this._configService.get(Configuration.SENDGRID_API_KEY);
    sgMail.setApiKey(ApiKey);
    const route = `http://localhost:4200/?${tokenVerfiy}`;
    const msg = {
      to: emailTo,
      from: 'noreply@gmail.com',
      subject: 'Verification Account',
      text: `Click on this link to verify your email`,
      html: `<a href=http://localhost:4200/verification/?token=${tokenVerfiy} >Thanks for all, click to confirm your account</a>`,
    };
    sgMail.send(msg).then(
      () => {},
      (error) => {
        console.error(error);
        if (error.response) {
          console.error(error.response.body);
        }
      },
    );
  }

  async signup(signupDto: SignupDto): Promise<{ JwtToken: string }> {
    debugger;

    const { email_user, birthday_user, firstName_user} = signupDto;
    const userExists = await this._authRepository.findOne({
      where: [{ email_user }],
    });

    if (userExists) {
      throw new ConflictException('User already exists');
    }else if (userExists != undefined){
       if (userExists.status  === 'INACTIVE'){
      throw new ConflictException('You would need to activate your account')
       }
    } else if ((await this.getUserAge(birthday_user)>= 18)) {
      const token = uid(12);
      //Sending mail
      this.sendMail(email_user, token);

      const payload: IJwtPayload = {
        firstName: firstName_user,
        email: email_user,
        role: RoleType.ADULT
      };

      const JwtToken = await this._jwtService.sign(payload);
      console.log('JSON web token:', JwtToken);
      this._authRepository.signup(signupDto, token);
      return { JwtToken };
    }
    throw new BadRequestException('Tell your parent to open the account');
  }

  async signin(signinDto: SigninDto): Promise<{ JwtToken: string }> {
    const { email_user, password_user } = signinDto;
    const user: User = await this._authRepository.findOne({
      where: { email_user },
    });

    if (!user) {
      throw new NotFoundException('User doesnt exists');
    }
    const isMatch = await compare(password_user, user.password_user);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload: IJwtPayload = {
      firstName: user.firstName_user,
      email: user.email_user,
      role: RoleType.ADULT
    };

    const JwtToken = await this._jwtService.sign(payload);
    console.log('JSON web token:', JwtToken);
    return { JwtToken };
  }
}
