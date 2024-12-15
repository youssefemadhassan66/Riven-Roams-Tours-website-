import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { AuthServicesService } from '../../services/Auth/auth-services.service';
import { ReviewSchema } from '../../schema/reviewSchema';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  LeadGuidUrl = 'http://localhost:3000/api/v1/users?role=lead-guide';
  userApi = 'http://localhost:3000/api/v1/users/';
  MeAPI = 'http://localhost:3000/api/v1/users/me';


  userData = new BehaviorSubject<any>({});
  constructor(private auth: AuthServicesService, private http: HttpClient) {}

  GetUser(): Observable<any> {
    return this.auth.getToken().pipe(
      switchMap((token) => {
        if (token) {
          const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
          return this.http.get<any>(this.MeAPI, { headers });
        } else {
          throw new Error('Token not found');
        }
      })
    );
  }

  GetUsers(): Observable<any> {
    return this.auth.getToken().pipe(
      switchMap((token) => {
        if (token) {
          const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
          return this.http.get<any>(this.userApi, { headers });
        } else {
          throw new Error('Token not found');
        }
      })
    );
  }

  deleteUser(id: string | undefined): Observable<any> {
      return this.auth.getToken().pipe(
        switchMap((token) => {
          if (token) {
            const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
            return this.http.delete(this.userApi + id, { headers });
          } else {
            throw new Error('Token not found');
          }
        })
      );
    }
}
