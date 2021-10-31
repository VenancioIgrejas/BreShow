import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private urlAuth = 'auth-keycloak/login';// 'auth-keycloak/login' as string;
  private headers = new HttpHeaders({
    "Access-Control-Allow-Credentials": 'true',
    "Access-Control-Allow-Origin":"*"
  });

  constructor(private httpBase: HttpClient, @Inject(DOCUMENT) private document: Document ) { }

  getUrlLogin(){
    return this.httpBase.get<any>(environment.urlService + this.urlAuth, {headers: this.headers}).subscribe(res => {
      this.document.location.href = res.url;
    });
  }

}
