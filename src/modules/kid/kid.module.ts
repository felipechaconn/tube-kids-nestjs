import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';
import { KidController } from './kid.controller';
import { KidService } from './kid.service';
import { KidRepository } from './kid.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ KidRepository, UserRepository])],
  controllers: [KidController],
  providers: [KidService]
})
export class KidModule {}
