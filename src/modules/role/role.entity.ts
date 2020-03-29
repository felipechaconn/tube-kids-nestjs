import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { type } from 'os';
import { User } from '../../modules/user/user.entity';

@Entity('roles')
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @ManyToMany(
    type => User,
    user => user.roles,
  )
  @JoinColumn()
  users: User[];

  @Column({ type: 'varchar', default: 'ACTIVE', length: 8 })
  status: string;
}
