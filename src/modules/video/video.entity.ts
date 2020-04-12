import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BeforeInsert,
    JoinTable,
    JoinColumn,
    ManyToOne,
  } from 'typeorm';
  import * as bcrypt from 'bcrypt';
  import { User } from '../../modules/user/user.entity';
  
  @Entity('videos')
  export class Video extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id_video: number;
  
    @Column({ type: 'varchar', length: 255, nullable: false })
    name_video: string;
  
    @Column({ type: 'varchar', length: 500})
    description_video: string;
  
    @Column({ type: 'varchar', length: 100, nullable: false })
    link_video: string;
  
    @ManyToOne(type => User,creator => creator.videos,{eager:true})
    creator: User;
 
  }
  