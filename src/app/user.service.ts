import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';


@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = `${environment.apiGatewayUrl}/user-service/api/v1/users`;

  constructor(private http: HttpClient) {}

  getAllUsers(token: string) {
    return this.http.get(this.apiUrl, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    });
  }
}
