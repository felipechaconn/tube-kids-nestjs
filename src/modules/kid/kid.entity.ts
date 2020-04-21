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
  import { type } from 'os';
  import { User } from '../user/user.entity';
  
  @Entity('kids')
  export class Kid extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id_kid: number;
  
    @Column({ type: 'varchar', length: 50, nullable: false })
    firstName_kid: string;
  
    @Column({ type: 'varchar', length: 100, nullable: false })
    username_kid: string;
  
    @Column({ type: 'date',  nullable: false })
    birthday_kid: Date;
  
    @Column({ type: 'varchar', length: 50, nullable: false })
    pin_kid: number;

    @ManyToOne(type => User,creator => creator.kids,{eager:true})
    creator: User;
  
  }
  