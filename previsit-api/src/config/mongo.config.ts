import { ConfigService } from '@nestjs/config';

export const mongoConfigFactory = (configService: ConfigService) => ({
  uri: configService.get<string>('MONGODB_URI'),
});
