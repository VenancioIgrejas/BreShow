import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { configService } from '../config/config.service';
import { JwtStrategy } from './jwt.strategy';
import { BcryptService } from './bcrypt/bcrypt.service';


@Module({
  imports: [PassportModule,
            JwtModule.register({
              secret: configService.getSecret(),
              signOptions: { expiresIn: '60s' },
            })],
  providers: [AuthService,JwtStrategy, BcryptService],
  controllers: [AuthController]
})
export class AuthModule {}
