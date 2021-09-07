import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
            AuthModule,
            UserModule,
            ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
