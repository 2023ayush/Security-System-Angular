import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';


@Injectable({ providedIn: 'root' })
export class AdminService {
  private apiUrl = `${environment.apiGatewayUrl}/micro1/message`;

  constructor(private http: HttpClient) {}

  getAdminMessage(token: string) {
    return this.http.get(this.apiUrl, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      responseType: 'text'
    });
  }
}
