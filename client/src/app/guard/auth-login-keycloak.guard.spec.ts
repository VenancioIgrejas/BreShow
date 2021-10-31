import { TestBed } from '@angular/core/testing';

import { AuthLoginKeycloakGuard } from './auth-login-keycloak.guard';

describe('AuthLoginKeycloakGuard', () => {
  let guard: AuthLoginKeycloakGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthLoginKeycloakGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
