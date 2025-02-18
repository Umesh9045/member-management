import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7030/api/auth/login';
  constructor(private router: Router) { }
  http = inject(HttpClient)
  isLoggedIn = false;

  login(data: { email: string; password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.apiUrl, data);
  }
  
  isAuthenticated(): boolean {
    if(this.getToken()){
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('jwt_token'); 
    this.router.navigate(['/Login']); 
  }

  getToken(): string | null {
    return localStorage.getItem('jwt_token'); // Get stored token
  }
}  