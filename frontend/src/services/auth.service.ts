import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { 
  }

  getHeader(token) {
    return new HttpHeaders({
      "Authorization": "Bearer " + token
    })
  }

  login(lifegroup, password) {
    const url = environment.API_BASE + environment.API_LOGIN;
    const data = {
      lifegroup: lifegroup,
      password: password
    }
    return this.httpClient.post(url, data);
  }

  logout(token) {
    const url = environment.API_BASE + environment.API_LOGOUT;
    return this.httpClient.get(url, {headers: this.getHeader(token)});
  }

  resetPwRequest(email) {
    const url = environment.API_BASE + environment.API_RESETPW + "?" + environment.EMAIL + "=" + email;
    return this.httpClient.get(url);
  }

  resetPw(body) {
    const url = environment.API_BASE + environment.API_RESETPW;
    return this.httpClient.post(url, body);
  }
}