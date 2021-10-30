import { Controller, Get, Redirect } from '@nestjs/common';
import { Public } from 'nest-keycloak-connect';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  //rota de teste do login
  @Get()
  @Redirect('auth-keycloak/login',404)
  @Public()
  getHello(): string {
    return this.appService.getHello();
  }

}
