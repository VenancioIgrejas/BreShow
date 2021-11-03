import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Header } from 'primeng/api';
import { from } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import jwt_decode from "jwt-decode";
import { JwtToken } from '../module/interface/jwt-token.interface';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  public baseHttp = environment.urlService;

  constructor(private httpBase: HttpClient, private keycloakbaseService: KeycloakService) { }

  getHeaderWithToken() {
    return this.keycloakbaseService.addTokenToHeader();
  }

  getTokenDecode() {
    return from(this.keycloakbaseService.getToken()).pipe(map(jwt => jwt_decode<JwtToken>(jwt)))
  }

  get<T>(urlService: string){
    return this.getHeaderWithToken().pipe(
      switchMap(header => this.httpBase.get<T>(this.baseHttp + urlService,{ headers: header }))
    );
  }

  getById<T>(urlService: string, id: string){
    return this.getHeaderWithToken().pipe(
      switchMap(header => this.httpBase.get<T>(this.baseHttp + urlService,{ 
        headers: header, 
        params: new HttpParams().set('id', id) 
      }))
    );
  }

  post<T>(urlService: string, entity: T){
    if(this.keycloakbaseService.isTokenExpired()) return null;

    return this.getHeaderWithToken().pipe(
      switchMap(header => this.httpBase.post(this.baseHttp + urlService + '/add', entity, { headers: header }))
    )
  }

  put<T>(urlService: string ,entity: T){
    if(this.keycloakbaseService.isTokenExpired()) return null;

    return this.getHeaderWithToken().pipe(
      switchMap(header => this.httpBase.put(this.baseHttp + urlService + '/edit', entity, { headers: header }))
    )
  }

  delete(urlService: string, id: string){
    return this.getHeaderWithToken().pipe(
      switchMap(header => this.httpBase.delete(this.baseHttp + urlService + '/delete',{ 
        headers: header, 
        params: new HttpParams().set('id', id)
      }))
    );
  }

}
