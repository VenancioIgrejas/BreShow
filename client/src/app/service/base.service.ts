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

  getIdUserAndHeader(){
    return this.getHeaderWithToken().pipe(map(header => <any>{idUser: jwt_decode<JwtToken>(header.get("authorization") as string).sub, header: header}))
  }

  getTokenDecode() {
    return from(this.keycloakbaseService.getToken()).pipe(map(jwt => jwt_decode<JwtToken>(jwt)))
  }

  get<T>(urlService: string){
    return this.getIdUserAndHeader().pipe(
      switchMap(obj => this.httpBase.get<T>(this.baseHttp + urlService,{ 
        headers: obj.header,
        params: new HttpParams().set('idUser', obj.idUser)
      }))
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

    return this.getIdUserAndHeader().pipe(
      switchMap(obj => this.httpBase.post(this.baseHttp + urlService + '/add', {...entity, idUser: obj.idUser}, { headers: obj.header }))
    )
  }

  put<T>(urlService: string ,id: string,entity: T){
    if(this.keycloakbaseService.isTokenExpired()) return null;

    return this.getIdUserAndHeader().pipe(
      switchMap(obj => this.httpBase.patch(this.baseHttp + urlService + '/edit', {...entity, idUser: obj.idUser}, { 
        headers: obj.header,
        params: new HttpParams().set('id', id)
       }))
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
