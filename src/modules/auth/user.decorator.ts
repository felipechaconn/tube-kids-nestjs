import { createParamDecorator } from '@nestjs/common';
import { UserDTO } from '../user/dto/user.dto';

export const GetUser = createParamDecorator(
  (data, req): UserDTO => {
    return req.user;
  },
);
