import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
// import KeycloakModule, { AuthGuard } from '../node_modules/nestjs-keycloak-admin'
import {
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
  AuthGuard,
} from 'nest-keycloak-connect';


import { APP_GUARD } from '@nestjs/core';

import { ProviderModule } from './provider/provider.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [TypeOrmModule.forRoot(),
    KeycloakConnectModule.registerAsync({
      useFactory: () => {
        return require('../keycloak.json')
      }
    }),
    ProviderModule,
    CategoryModule,
    ProductModule
    ],
  controllers: [AppController],
  providers: [AppService, // These are in order, see https://docs.nestjs.com/guards#binding-guards
    // for more information
 
    // This adds a global level authentication guard, you can also have it scoped
    // if you like.
    //
    // Will return a 401 unauthorized when it is unable to
    // verify the JWT token or Bearer header is missing.
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    // This adds a global level resource guard, which is permissive.
    // Only controllers annotated with @Resource and methods with @Scopes
    // are handled by this guard.
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    // New in 1.1.0
    // This adds a global level role guard, which is permissive.
    // Used by `@Roles` decorator with the optional `@AllowAnyRole` decorator for allowing any
    // specified role passed.
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },],
})
export class AppModule { }
