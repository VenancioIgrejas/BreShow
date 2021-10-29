import { Module } from '@nestjs/common';
import { AuthKeycloakController } from './auth-keycloak.controller';
import { AuthKeycloakService } from './auth-keycloak.service';

@Module({
  controllers: [AuthKeycloakController],
  providers: [AuthKeycloakService]
})
export class AuthKeycloakModule {}
