import { Controller, Post, Body, UsePipes, ValidationPipe, Header, Get, Query, Param, ParseIntPipe, Req } from '@nestjs/common';
import { SignupDto, SigninDto } from './dto';
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
}
