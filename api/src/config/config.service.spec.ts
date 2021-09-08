import { Test, TestingModule } from '@nestjs/testing';
import { configService } from './config.service';

describe('ConfigService', () => {

  beforeEach(async () => {
    // const module: TestingModule = await Test.createTestingModule({
    //   providers: [configService],
    // }).compile();

  });

  it('SECRET is working', () => {
    expect(configService.getSecret()).toBeDefined();
  });
});
