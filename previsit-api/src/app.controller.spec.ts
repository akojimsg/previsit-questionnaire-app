import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('Health checks', () => {
    it('should return "pong!"', () => {
      const result = appController.ping();
      expect(result).toEqual({ message: 'pong!' });
    });

    it('should return "OK"', () => {
      const result = appController.healthCheck();
      expect(result).toEqual({ status: 'OK' });
    });
  });
});
