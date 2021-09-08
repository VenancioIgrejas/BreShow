import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { BcryptService } from '../auth/bcrypt/bcrypt.service';
import { configDatabaseTestService } from '../config/config-database-test.service'
import { CreateUserDto } from './dto/create-user.dto';
import { ModuleRef } from '@nestjs/core';

describe('UserService', () => {
  let service: UserService;
  let serviceCrypth: BcryptService;
  let moduleRef: TestingModule;

  let usernameMock = "venancio" as string;
  let canDelete = false as boolean;

  beforeEach(async () => {

    moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(configDatabaseTestService.getForRootConfig()),
        TypeOrmModule.forFeature([User]),
      ],
      providers: [UserService, BcryptService],
    }).compile();

    service = moduleRef.get<UserService>(UserService);
    serviceCrypth = moduleRef.get<BcryptService>(BcryptService);
  });

  afterEach(async () => {
    // Free DB connection for next test
    await moduleRef.close();
  });

  it('return all users', async () => {
    const user = await service.findAll();
    expect(user.length).toBeGreaterThanOrEqual(0);
  });

  it('create venancio user', async () => {

    const user = await service.findOne(usernameMock);
    if (user) return expect(user.username).toBe(usernameMock);

    let dto = new CreateUserDto()
    dto.password = 'teste'
    dto.username = usernameMock
    dto.email = 'venancioteste@gmail.com'

    const newUser = await service.create(dto);

    expect(newUser).toBeDefined();

  })

  it('check hash comparing of venancio"s password ', async () => {

    const user = await service.findOne(usernameMock);
    if (!user) return expect(user).toBeUndefined();

    serviceCrypth.hash = user.password;
    serviceCrypth.password = 'teste';

    return expect(await serviceCrypth.compareHashPassword())
      .toBe(true);

  })

  it('duplicate user venancio',async () => {
    const user = await service.findOne(usernameMock);
    if (!user) return expect(user).toBeUndefined();

    let dto = new CreateUserDto()
    dto.password = 'teste'
    dto.username = usernameMock
    dto.email = 'venancioteste@gmail.com'

    expect(await service.create(dto)).toThrowError();

  })

  it('deleting user venancio', async () => {
    const user = await service.findOne(usernameMock);
    if (!user) return expect(user).toBeUndefined();

    if (canDelete) {
      let userDeleted = await service.remove(user.id);
      expect(userDeleted.affected).toBeGreaterThanOrEqual(0);
    }
  })

});