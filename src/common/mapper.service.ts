import { Injectable } from '@nestjs/common';
import { TypeMapper } from 'ts-mapper';
import { User } from '../modules/user/user.entity';
import { UserDTO } from '../modules/user/dto/user.dto';
@Injectable()
export class MapperService extends TypeMapper {
  constructor() {
    super();
    this.config();
  }

  private config() {
    this.createMap<User, UserDTO>()
      .map(
        entity => entity.id_user,
        dto => dto.id_user,
      )
      .map(
        entity => entity.email_user,
        dto => dto.email_user,
      )
      .map(
        entity => entity.firstName_user,
        dto => dto.firstName_user,
      )
      .map(
        entity => entity.roles,
        dto => dto.roles,
      );
  }
}
