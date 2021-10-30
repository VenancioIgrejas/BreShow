import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
HttpModule
import { AuthKeycloakController } from './auth-keycloak.controller';
import { AuthKeycloakService } from './auth-keycloak.service';

@Module({
  imports:[HttpModule],
  controllers: [AuthKeycloakController],
  providers: [AuthKeycloakService]
})
export class AuthKeycloakModule {}
