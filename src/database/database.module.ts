import { Module } from '@nestjs/common';
import { databaseProvirders } from './database.service';

@Module({
  imports: [...databaseProvirders],
  exports: [...databaseProvirders],
})
export class DatabaseModule {}
