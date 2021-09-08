import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BcryptService } from '../auth/bcrypt/bcrypt.service';
import { AuthModule } from '../auth/auth.module';
import { configDatabaseTestService } from '../config/config-database-test.service';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;
  let moduleRef: TestingModule;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports:[
        TypeOrmModule.forRoot(configDatabaseTestService.getForRootConfig()),
        TypeOrmModule.forFeature([User]),
        ],
      controllers: [UserController],
      providers: [UserService,BcryptService],
    }).compile();

    userController = moduleRef.get<UserController>(UserController);
    userService = moduleRef.get<UserService>(UserService);
  });

  afterEach(async () => {
    // Free DB connection for next test
    await moduleRef.close();
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });
});
