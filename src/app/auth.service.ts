import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5555/auth/api/v1/auth'; // via API Gateway

  constructor(private http: HttpClient) {}

  // ----------------- AUTH API CALLS -----------------
  login(data: any) {
    // Backend returns { message, status, data: token }
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

  // ----------------- TOKEN & USER STORAGE -----------------
  // Save token + username after login
  saveAuthData(token: string, username: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
  }

  // Save only token (optional)
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  // Get JWT token
  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  // Get stored username
  getUsername(): string {
    return localStorage.getItem('username') || '';
  }

  // Get role from JWT token
  getUserRole(): string {
    const token = this.getToken();
    if (!token || token.split('.').length !== 3) return '';

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role || '';
    } catch (error) {
      console.error('Token parsing failed:', error);
      return '';
    }
  }

  // Logout user
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }
}
