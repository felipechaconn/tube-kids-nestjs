import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleType } from '../roletype.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly _reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    ;
    const role = this._reflector.get<string[]>('role', context.getHandler());

    if(!role) {
      return true
    }
    const request = context.switchToHttp().getRequest();
  
    const video = request;
    console.log('user')
    const isAdult = video.name === RoleType.ADULT; // role corresponde al role que se necesita para acceder al recurso.
    return video && video.name && isAdult;
  }
}
