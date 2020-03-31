import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from '../../modules/role/role.entity';

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

  @Column({ type: 'varchar', default: 'ACTIVE', length: 8 })
  status: string;

  @Column()
  password_user: string;

  @ManyToMany(
    type => Role,
    role => role.users,
  )
  @JoinTable({ name: 'user_roles' })
  roles: Role[];
  
}
