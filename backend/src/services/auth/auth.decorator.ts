import { createParamDecorator } from '@nestjs/common';

export const AuthUser = createParamDecorator((data, req) => {
  return {
    user: req.user
  };
});

const decode = (token: string) => {
  return token.replace('Bearer ', '');
};
