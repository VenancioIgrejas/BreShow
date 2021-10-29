import { Module } from '@nestjs/common';
import {HttpModule} from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard, KeycloakConnectModule, RoleGuard } from 'nest-keycloak-connect';
import { APP_GUARD } from '@nestjs/core';

import { ProviderModule } from './provider/provider.module';
import { AuthKeycloakModule } from './auth/auth-keycloak/auth-keycloak.module';
import { ConfigModule, ConfigService } from '@nestjs/config';


const keyCloakOptionsProvider =  {
  provide: 'keyCloakDataProvider',
  useFactory: (config: ConfigService) => {
    return {
      authServerUrl: config.get('KEYCLOAK_AUTH_URI'),
      realm: config.get('KEYCLOAK_REALM'),
      clientId: config.get('KEYCLOAK_CLIENT_ID'),
      secret: config.get('KEYCLOAK_CLIENT_SECRET'),
    }
  },
  inject: [ ConfigService],
};


@Module({
  imports: [TypeOrmModule.forRoot(),
    KeycloakConnectModule.registerAsync(keyCloakOptionsProvider),
    ProviderModule,
    AuthKeycloakModule,
    HttpModule,
    ConfigModule.forRoot({
      // envFilePath: '.envDevDocker',
      envFilePath: '.envDevLocal',
      isGlobal: true,
    })
    ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },
  {
    provide: APP_GUARD,
    useClass: RoleGuard,
  },],
})
export class AppModule { }
