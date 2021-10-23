import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import KeycloakModule, { AuthGuard } from '../node_modules/nestjs-keycloak-admin'
import { APP_GUARD } from '@nestjs/core';

import { ProviderModule } from './provider/provider.module';

@Module({
  imports: [TypeOrmModule.forRoot(),
    KeycloakModule.registerAsync({
      useFactory: () => {
        return require('../keycloak.json');
      }}),
    ProviderModule
    ],
  controllers: [AppController],
  providers: [AppService, {provide: APP_GUARD, useClass:AuthGuard}],
})
export class AppModule { }
