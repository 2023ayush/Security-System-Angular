import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5555/auth/api/v1/auth'; // via gateway

  constructor(private http: HttpClient) {}

  login(data: any) {
  // The backend returns { message, status, data: token }
  return this.http.post<{ message: string; status: number; data: string }>(
    `${this.baseUrl}/login`,
    data
  );
}

  registerUser(data: any) {
    return this.http.post(`${this.baseUrl}/register/user`, data);
  }

 registerAdmin(data: any) {
  return this.http.post(`${this.baseUrl}/register/admin`, data, {
    headers: {
      Authorization: `Bearer ${this.getToken()}`
    }
  });
}

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  // <-- Add this method here
getUserRole(): string {
  const token = this.getToken();
  if (!token || token.split('.').length !== 3) return '';

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role || ''; // return 'role' field from token
  } catch (error) {
    console.error('Token parsing failed:', error);
    return '';
  }
}


}
