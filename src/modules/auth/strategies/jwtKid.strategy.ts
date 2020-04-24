import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '../../../config/config.service';
import { Configuration } from '../../../config/config.keys';
import { AuthRepository } from '../auth.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { IJwtPayload } from '../jwt-payload.interface';
import { KidRepository } from 'src/modules/kid/kid.repository';
import { IJwtKidPayload } from '../jwtKid-payload.interface';
@Injectable()
export class JwtKidStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly _configService: ConfigService,
    @InjectRepository(KidRepository)
    private readonly _kidRepository: KidRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: _configService.get(Configuration.JWT_SECRET),
    });
  }

  async validateKid(payload: IJwtKidPayload) {
    const { username } = payload;
    const kid = await this._kidRepository.findOne({
        where: {username, status: 'ACTIVE'},
    });
    if (!kid) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
