import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { Request } from 'express';

export const TenantId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request: Request = ctx.switchToHttp().getRequest();
    const tenantId = request.headers['x-tenant-id'];
    if (typeof tenantId !== 'string') {
      throw new BadRequestException('Missing x-tenant-id header');
    }
    return tenantId;
  },
);
