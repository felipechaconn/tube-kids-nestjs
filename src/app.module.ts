import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { Configuration } from './config/config.keys';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { AuthModule } from './modules/auth/auth.module';
import { VideoModule } from './modules/video/video.module';

@Module({
  imports: [ConfigModule, UserModule, DatabaseModule, RoleModule, AuthModule,VideoModule],
})
export class AppModule {
  static port: number | string;

  constructor(private readonly __configService: ConfigService) {
    AppModule.port = this.__configService.get(Configuration.PORT);
    console.log('SERVER listen on port:', AppModule.port);
  }
}
