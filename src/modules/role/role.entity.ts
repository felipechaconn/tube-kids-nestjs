import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
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

  @OneToMany(
    type => User,
    user => user.roles,
  )
  @JoinColumn()
    users: User[];

  @Column({ type: 'varchar', default: 'ACTIVE', length: 8 })
    status: string;
}
