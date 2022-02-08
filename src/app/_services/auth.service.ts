import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { BasicData } from '../_models/basicData';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl =  environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  baseUrl2 = environment.apiUrl;
constructor(private http: HttpClient) { }

login(model: any){
  console.log("tttttttt", this.baseUrl + 'login')
  console.log("ttttttttModel", model)

  return this.http.post(this.baseUrl + 'login', model).pipe(
    map((response: any) => {
      const user = response;
      if (user) {
        console.log('user', user)
        localStorage.setItem('token', user.token);
        this.decodedToken = this.jwtHelper.decodeToken(user.token);
        console.log('ddddddddddddddd',this.decodedToken)
        
      }
      else{
        console.log("tttt")
      }
    })
  );
}

register(model: any){
  return this.http.post(this.baseUrl + 'register', model);
}
processReg(model: any){
  return this.http.post(this.baseUrl + 'processReg', model);
}

getOrgIds(): Observable<BasicData[]> {
  return this.http.get<BasicData[]>(this.baseUrl2 + 'Basicdata/orgIds');
}

loggedIn(){
  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token || '{}');
}

}
