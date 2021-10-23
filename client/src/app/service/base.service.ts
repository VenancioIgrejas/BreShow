import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BaseService {

  public baseHttp = environment.urlService;

  constructor(private httpBase: HttpClient, private keycloakbaseService: KeycloakService) { }

  getHeaderWithToken() {
    return from(this.keycloakbaseService.getToken()).pipe(
      map(auth_token => new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      })
    ))
  }

  get<T>(urlService: string){
    return this.getHeaderWithToken().pipe(
      switchMap(header => this.httpBase.get<T>(this.baseHttp + '/' + urlService,{ headers: (header as any) }))
    );
  }
}
