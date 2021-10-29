import { Test, TestingModule } from '@nestjs/testing';
import { AuthKeycloakController } from './auth-keycloak.controller';

describe('AuthKeycloakController', () => {
  let controller: AuthKeycloakController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthKeycloakController],
    }).compile();

    controller = module.get<AuthKeycloakController>(AuthKeycloakController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
