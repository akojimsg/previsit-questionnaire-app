import { createKeyv } from '@keyv/redis';
import { ConfigService } from '@nestjs/config';

export const redisCacheConfigFactory = (configService: ConfigService) => {
  const uri = configService.get<string>('REDIS_URI');
  const ttl = configService.get<number>('CACHE_TTL');

  return {
    ttl,
    stores: [createKeyv(uri)],
  };
};
