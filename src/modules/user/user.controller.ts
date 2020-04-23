import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { getCustomRepository } from 'typeorm';
import { User } from './user.entity';
import { UserDTO } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ReadUserDto, UpdateUserDto } from './dto';

//El gard es un middlaware 

@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}


  @UseGuards(AuthGuard('jwt'))
  @Get('emailUser/:userEmail')
  getUserIdByEmail(@Param('userEmail') userEmail: string): Promise<ReadUserDto> {
    return  this._userService.getIdByEmail(userEmail);
   
  }

  @Get('dataUser/:userId')
  getUser(@Param('userId',ParseIntPipe) userId: number): Promise<ReadUserDto> {
    return  this._userService.getOne(userId);
   
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getUsers(): Promise<ReadUserDto[]> {
    return this._userService.getAll();
   
  }
  @UseGuards(AuthGuard('jwt'))
  @Patch(':userId')
  async updateUser(
    @Param('userId',ParseIntPipe) userId: number,
    @Body() user: UpdateUserDto,
  ) {
    return this._userService.update(userId, user);
  }

  
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteUser(@Param('id',ParseIntPipe) id: number) {
    await this._userService.delete(id);
    return true;
  }

  @Get('verification/:token')
  async findUserToken(@Param('token') token: string){
    await this._userService.activateUser(token);
  }

}
