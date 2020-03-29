import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { MapperService } from '../../common/mapper.service';
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
    private readonly _mapperService: MapperService,
  ) {}

  public async getOne(id: number): Promise<UserDTO> {
    if (!id) {
      throw new BadRequestException('id must be sent');
    }

    const user: User = await this._userRepository.findOne(id, {
      where: { status: 'ACTIVE' },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return this._mapperService.map<User, UserDTO>(user, new UserDTO());
  }

  public async getAll(): Promise<UserDTO[]> {
    const users: User[] = await this._userRepository.find({
      where: { status: 'ACTIVE' },
    });

    if (!users) {
      throw new NotFoundException();
    }

    return this._mapperService.mapCollection<User, UserDTO>(
      users,
      new UserDTO(),
    );
  }
  public async getUserAge(user: User) {
    const today = new Date();
    const userAge = user.birthday_user;
    let age = today.getFullYear() - userAge.getFullYear();
    const months = today.getMonth() - userAge.getMonth();
    if (months < 0 || (months === 0 && today.getDate() < userAge.getDate())) {
      age--;
    }
    return age;
  }

  public async create(user: User): Promise<UserDTO> {
    const repo = await getConnection().getRepository(Role);
    const defaultRole = await repo.findOne({ where: { name: 'ADULT' } });
    user.roles = [defaultRole];

    const savedUser = await this._userRepository.save(user);
    return this._mapperService.map<User, UserDTO>(savedUser, new UserDTO());
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
}
