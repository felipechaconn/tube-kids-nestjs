import { Controller, Post, Body, UsePipes, ValidationPipe, Header, Get, Query, Param, ParseIntPipe, Req } from '@nestjs/common';
import { SignupDto, SigninDto, SigninKidDto } from './dto';
import { AuthService } from './auth.service';
import { UserDTO } from '../user/dto/user.dto';
import {Request} from 'express';
@Controller('auth')
export class AuthController {

constructor(private readonly _authService: AuthService) {

}

    @Post('/signup')
    @UsePipes(ValidationPipe)
    @Header('Cache-Control', 'none')
    async signup(@Body() signupDto: SignupDto){
        return this._authService.signup(signupDto);
    }

    @Post('/login')
    @UsePipes(ValidationPipe)
    async signin(@Body() signinDto: SigninDto) {
        return this._authService.signin(signinDto);

    }
    
    @Post('kid/login')
    @UsePipes(ValidationPipe)
    async signinKid(@Body() signinKidDto: SigninKidDto) {
        console.log(signinKidDto);
        return this._authService.signinKid(signinKidDto);

    }

    @Post('/verification/:userId')
    async twofactorAuth( @Param('userId',ParseIntPipe) userId: number,
    @Body('code_verify') tokenVerify: string){
        return this._authService.twoFactorAuth(tokenVerify,userId);
    }
}
