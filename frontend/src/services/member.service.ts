import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
@Injectable()

export class MemberService {
  header: HttpHeaders;
  newPassword: string;
  baseUrl: string;
  adminLg: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.API_BASE + environment.API_MEMBER;
  }

  ngOnInit() {
  }

  getHeader(token) {
    return new HttpHeaders({
      "Authorization": "Bearer " + token
    })
  }

  getLifegroupMembers(token, adminLg) {
    const url = this.baseUrl + "?" + environment.API_LG + "=" + adminLg;
    return this.httpClient.get(url, {
      headers: this.getHeader(token)
    })
  }

  createMember(body, token) {
    return this.httpClient.post(this.baseUrl, body, { headers: this.getHeader(token) });
  }

  deleteMember(id, token) {
    const url = this.baseUrl + "?" + environment.ID + "=" + id;
    return this.httpClient.delete(url, { headers: this.getHeader(token) });
  }

  editMember(body, token) {
    return this.httpClient.put(this.baseUrl, body, { headers: this.getHeader(token) })
  }

}
