import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { async } from 'rxjs/internal/scheduler/async';
import { UserDTO } from './dto/user.dto';
import { User } from './user.entity';
import { getConnection } from 'typeorm';
import { Role } from '../role/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
  ) {}

  public async getOne(id: number): Promise<User> {
    if (!id) {
      throw new BadRequestException('id must be sent');
    }

    const user: User = await this._userRepository.findOne(id, {
      where: { status: 'ACTIVE' },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  public async getAll(): Promise<User[]> {
    const users: User[] = await this._userRepository.find({
      where: { status: 'ACTIVE' },
    });

    if (!users) {
      throw new NotFoundException();
    }

    return users;
  }

  public async update(id: number, user: User): Promise<void> {
    await this._userRepository.update(id, user);
  }

  public async delete(id: number): Promise<void> {
    const userExists = await this._userRepository.findOne(id, {
      where: { status: ' ACTIVE' },
    });

    if (!userExists) {
      throw new NotFoundException();
    }
    await this._userRepository.update(id, { status: 'INACTIVE' });
  }

  public async activateUser(token: string):Promise<User> {
    console.log(token);
    const userExists: User = await this._userRepository.findOne({
      where: { vcode: token },
    });

    console.log("user",userExists.status );
    
    if (!userExists) {
      throw new NotFoundException('You already authorized');
    }
    try {
      debugger
    await this._userRepository.update( userExists,{ status: 'ACTIVE' });
    
    return userExists;
    
  } catch(e) {
      console.log(e);
    }
    await this._userRepository.update(userExists, {vcode: null});
  }
}
