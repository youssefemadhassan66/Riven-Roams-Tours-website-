import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { Router } from '@angular/router';

export interface AuthResponse {
  status: string;
  token: string;
  data: {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    passwordChangeAt: Date;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthServicesService {
  apiUrl = 'http://localhost:3000/api/v1/users/';
  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  private isLocalStorageAvailable = typeof localStorage !== 'undefined';

  constructor(private http: HttpClient, private _router: Router) {
    if (this.isLocalStorageAvailable) {
      const storedToken = localStorage.getItem('accessToken');
      if (storedToken && !this.isTokenExpired(storedToken)) {
        this.tokenSubject.next(storedToken);
      } else {
        localStorage.removeItem('accessToken');
      }
    }
  }

  private isTokenExpired(token: string): boolean {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      console.log(decoded);
      if (decoded && decoded.exp) {
        const curTime = Date.now() / 1000;

        return decoded.exp < curTime;
      }
      return true;
    } catch (err) {
      console.error('Failed to decode token:', err);
      return true;
    }
  }
  signUp(name: string, email: string, password: string, reTypePassword: string, photo: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}signup`, { name, email, password, reTypePassword, photo }).pipe(
      tap((res) => {
        console.log(res);

        const token = res.token;

        if (token && !this.isTokenExpired(token)) {
          localStorage.setItem('accessToken', token);
          this.tokenSubject.next(token);
        }
      })
    );
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}login`, { email, password }).pipe(
      tap((res) => {
        console.log(res);
        const token = res.token;

        if (token && !this.isTokenExpired(token)) {
          localStorage.setItem('accessToken', token);
          this.tokenSubject.next(token);
        }
      })
    );
  }
  logOut(): void {
    this.tokenSubject.next(null);
    localStorage.removeItem('accessToken');
    this._router.navigate(['/login']);
  }

  isAuthenticated(): Boolean {
    const token = this.tokenSubject.value;
    // console.log(`is logged in :  ${token !== null && !this.isTokenExpired(token)}`);
    return token !== null && !this.isTokenExpired(token);
  }

  getToken(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }
}
