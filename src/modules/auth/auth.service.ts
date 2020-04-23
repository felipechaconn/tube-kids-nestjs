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
import { LocalStorage } from 'node-localstorage';
import { from } from 'rxjs';
import { uid } from 'rand-token';
import { ConfigService } from 'src/config/config.service';
import { config } from 'dotenv/types';
import { totp } from 'otplib';
import { Configuration } from 'src/config/config.keys';
import { throws } from 'assert';
import { ReadUserDto } from '../user/dto';
import { SigninKidDto } from './dto/signinKid.dto';
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
    const { email_user, birthday_user, firstName_user, phone_user } = signupDto;
    const userExists = await this._authRepository.findOne({
      where: [{ email_user }],
    });

    if (userExists) {
      throw new ConflictException('User already exists');
    } else if (userExists != undefined) {
      if (userExists.status === 'INACTIVE') {
        throw new ConflictException('You would need to activate your account');
      }
    } else if ((await this.getUserAge(birthday_user)) >= 18) {
      const token = uid(12);
      //Sending mail
      this.sendMail(email_user, token);

      const payload: IJwtPayload = {
        firstName: firstName_user,
        email: email_user,
        phoneUser: phone_user,
      };

      const JwtToken = await this._jwtService.sign(payload);
      console.log('JSON web token:', JwtToken);
      this._authRepository.signup(signupDto, token);
      return { JwtToken };
    }
    throw new BadRequestException('Tell your parent to open the account');
  }

  async loginKidsAndAdults(signinDto: SigninDto, signinKid: SigninKidDto) {
    const { email_user, password_user } = signinDto;
  }
  //Este metodo es para uso del otplib genera el token que sera enviado por mensaje
  public createCodeTFA(tokenVerfiy: string) {
    if (!tokenVerfiy) {
      throw new NotFoundException('Need to send code');
    }
  totp.options = {
      step: 80,
      window: 1
    };
    const tokenEncrypt: string = totp.generate(tokenVerfiy);
    console.log(' Mini token Generado',tokenEncrypt);
    console.log('token de verificacion',tokenVerfiy);
    return tokenEncrypt;
  }

  async signin(signinDto: SigninDto): Promise<{ userId: number }> {
    const { email_user, password_user } = signinDto;
    const user: User = await this._authRepository.findOne({
      where: { email_user },
    });

    if (!user) {
      throw new NotFoundException('User doesnt exists');
    }
    const userId = user.id_user;
    const isMatch = await compare(password_user, user.password_user);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid password');
    }
    const tokenValidate = this.createCodeTFA(user.vcode);
    this.sentSMSVerification(tokenValidate, user.phone_user);

    return { userId };
  }

  async twoFactorAuth(token: string, idUser: number | string): Promise<{ JwtToken: string }> {
    const user: User = await this._authRepository.findOne(idUser,{
      where: {status: 'ACTIVE'},
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    try {
      const secret = user.vcode;
      console.log('Esto es lo que vamos a verificar',token,secret);
      const verifyTokens = totp.verify({secret:secret, token:token});
      console.log(verifyTokens)
      const isValid: boolean = verifyTokens;

      console.log(isValid);
      if (!isValid) {
        throw new UnauthorizedException(
          'Incorrect Code check the correct code',
        );
      }
      const payload: IJwtPayload = {
        firstName: user.firstName_user,
        email: user.email_user,
        phoneUser: user.phone_user,
      };

      const JwtToken = await this._jwtService.sign(payload);
      console.log('JSON web token:', JwtToken);
      return { JwtToken };
    } catch (err) {
      // Possible errors
      // - options validation
      // - "Invalid input - it is not base32 encoded string" (if thiry-two is used)
      console.error(err);
    }
  }

  //Este metodo envia el mensaje
  async sentSMSVerification(tokenValidate: any, phone_user: string | number) {
    //Este es el api de Twilio
    const ApiSID = this._configService.get(Configuration.TWILIO_SID);
    //Este es el key de Twilio
    const ApiKey = this._configService.get(Configuration.TWILIO_TOKEN);
    const client = require('twilio')(ApiSID, ApiKey);

    return client.messages
      .create({
        body: `this is your verification code: ${tokenValidate}`,
        from: '+12058392916',
        to: phone_user,
      })
      .then((message) => console.log(message.sid));
  }
}
