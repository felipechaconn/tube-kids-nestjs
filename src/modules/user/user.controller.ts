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

//El gard es un middlaware 
@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get(':id')
  async getUser(@Param('id',ParseIntPipe) id: number): Promise<User> {
    const user = await this._userService.getOne(id);
    return user;
  }

  @Get()
  async getUsers(): Promise<User[]> {
    const users = await this._userService.getAll();
    return users;
  }

  @Patch(':id')
  async updateUser(
    @Param('id',ParseIntPipe) id: number,
    @Body() user: User,
  ): Promise<User | void> {
    const updatedUser = await this._userService.update(id, user);
    return updatedUser;
  }

  @Delete(':id')
  async deleteUser(@Param('id',ParseIntPipe) id: number) {
    await this._userService.delete(id);
    return true;
  }
}
