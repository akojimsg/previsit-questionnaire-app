import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { mongoConfigFactory } from '@previsit-api/config/mongo.config';
import { TenantModule } from '@previsit-api/domains/tenant/tenant.module';
import { EhrFieldMappingModule } from '@previsit-api/domains/ehr-field-mapping/ehr-field-mapping.module';
import { QuestionModule } from '@previsit-api/domains/question/question.module';
import { QuestionnaireModule } from '@previsit-api/domains/questionnaire/questionnaire.module';
import { PatientAnswerModule } from '@previsit-api/domains/patient-answer/patient-answer.module';
import { redisCacheConfigFactory } from '@previsit-api/config/redis-cache.config';
import { CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        MONGODB_URI: Joi.string().required(),
        REDIS_URI: Joi.string().default('redis://localhost:6379'),
        REDIS_HOST: Joi.string().default('localhost'),
        REDIS_PORT: Joi.number().default(6379),
        CACHE_TTL: Joi.number().default(5000),
        CONSOLE_URL: Joi.string().default('http://localhost:9000'),
        PREVISIT_APP_URL: Joi.string().default('http://localhost:3002'),
      }),
    }),
    MongooseModule.forRootAsync({
      useFactory: mongoConfigFactory,
      inject: [ConfigService],
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: redisCacheConfigFactory,
      inject: [ConfigService],
    }),
    EhrFieldMappingModule,
    PatientAnswerModule,
    QuestionModule,
    QuestionnaireModule,
    TenantModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
