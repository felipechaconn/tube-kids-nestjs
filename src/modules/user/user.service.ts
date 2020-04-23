import {
  Injectable,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { ReadUserDto, UpdateUserDto } from './dto';
import { plainToClass } from 'class-transformer';
import { authenticator } from 'otplib';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
  ) {}

  public async getIdByEmail(emailUser: string): Promise<ReadUserDto> {
    if (!emailUser) {
      throw new BadRequestException('email must be sent');
    }
    console.log(emailUser);
    const user: User = await this._userRepository.findOne({
      where: { status: 'ACTIVE', email_user: emailUser },
    });
    if (!user) {
      throw new NotFoundException('user doesnt exists');
    }
    return plainToClass(ReadUserDto, user.id_user);
  }
  public async getOne(idUser: number): Promise<ReadUserDto> {
    if (!idUser) {
      throw new BadRequestException('id must be sent');
    }

    const user: User = await this._userRepository.findOne(idUser, {
      where: { status: 'ACTIVE' },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return plainToClass(ReadUserDto, user);
  }

  public async getAll(): Promise<ReadUserDto[]> {
    const users: User[] = await this._userRepository.find({
      where: { status: 'ACTIVE' },
    });

    if (!users) {
      throw new NotFoundException();
    }

    return users.map((user: User) => plainToClass(ReadUserDto, user));
  }

  public async update(
    userId: number,
    user: UpdateUserDto,
  ): Promise<ReadUserDto> {
    const foundUser = await this._userRepository.findOne(userId, {
      where: { status: 'ACTIVE' },
    });
    if (!foundUser) {
      throw new NotFoundException('UserDoes not exists');
    }
    foundUser.phone_user = user.phone_user;
    foundUser.email_user = user.email_user;
    const updatedUser = await this._userRepository.save(foundUser);
    return plainToClass(ReadUserDto, updatedUser);
  }

  public async delete(userId: number): Promise<void> {
    const userExists = await this._userRepository.findOne(userId, {
      where: { status: ' ACTIVE' },
    });

    if (!userExists) {
      throw new NotFoundException();
    }
    await this._userRepository.update(userId, { status: 'INACTIVE' });
  }

  public async activateUser(token: string): Promise<User> {
    console.log(token);
    const userExists: User = await this._userRepository.findOne({
      where: { vcode: token },
    });

    console.log('user', userExists.status);
    
    if (!userExists) {
      throw new NotFoundException('You already authorized');
    }
    try {

      await this._userRepository.update(userExists, { status: 'ACTIVE' });

      return userExists;
    } catch (e) {
      console.log(e);
    }
    await this._userRepository.update(userExists, { vcode: null });
  }
}
