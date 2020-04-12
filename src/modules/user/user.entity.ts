import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  ManyToMany,
  JoinTable,
  JoinColumn,
  OneToMany,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from '../../modules/role/role.entity';
import { type } from 'os';
import { Video } from '../video/video.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id_user: number;

  @Column({ type: 'varchar', unique: true, length: 255, nullable: false })
  email_user: string;

  @Column()
  firstName_user: string;

  @Column()
  lastName_user: string;

  @Column()
  country_user: string;

  @Column()
  birthday_user: Date;

  @Column()
  phone_user: string;

  @Column({ type: 'varchar', default: 'INACTIVE', length: 8 })
  status: string;

  @Column({ type: 'varchar', length: 255 })
  vcode: string;


  @Column()
  password_user: string;


  @OneToMany(type => Video,video => video.creator)
  videos: Video[];
  


  @ManyToOne(
    type => Role,
    role => role.users,
    {cascade:true,
      eager:true}

  )
  @JoinColumn({ name: 'user_rol' })
  roles: Role;
  
}
