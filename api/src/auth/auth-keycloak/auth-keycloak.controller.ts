import { Body, Controller, Get, HttpCode, Post, Query, Redirect } from '@nestjs/common';
import { Public, Unprotected } from 'nest-keycloak-connect';
import { AuthKeycloakService } from './auth-keycloak.service';
import { KeycloakToken } from './token-keycloak.model';

@Controller('auth-keycloak')
export class AuthKeycloakController {

    constructor(private _authService: AuthKeycloakService){}

    @Get('login')
    // @Redirect('', 301)
    @Public()
    login(){
       return this._authService.getUrlLogin();
    }

    @Get('callback')
    @Unprotected()
    getAcessToken(@Query('code') code: string) {
        return this._authService.getAcessToken(code);
    }

    @Post('refreshToken')
    @Unprotected()
    refreshAccessToken(@Body() token: KeycloakToken) {
        return this._authService.refreshAccessToken(token.refresh_token)
    }

    @Post('logout')
    @HttpCode(204)
    logout(@Body() token: KeycloakToken){
        return this._authService.logout(token.refresh_token);
    }

}
