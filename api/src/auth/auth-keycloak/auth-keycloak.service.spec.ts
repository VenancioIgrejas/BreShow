import { Test, TestingModule } from '@nestjs/testing';
import { AuthKeycloakService } from './auth-keycloak.service';

describe('AuthKeycloakService', () => {
  let service: AuthKeycloakService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthKeycloakService],
    }).compile();

    service = module.get<AuthKeycloakService>(AuthKeycloakService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
