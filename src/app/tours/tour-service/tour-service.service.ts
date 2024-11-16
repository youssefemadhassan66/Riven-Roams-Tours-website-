import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable,switchMap } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { TourSchema } from '../../schema/tourSchema';
import { ReviewSchema } from '../../schema/reviewSchema';
import { AuthServicesService } from '../../services/Auth/auth-services.service';
@Injectable({
  providedIn: 'root',
})
export class TourServiceService {
  apiUrl = 'http://localhost:3000/api/v1/tours/';
  GetReviewsForATour = 'http://localhost:3000/api/v1/tours/5c88fa8cf4afda39709c2955/reviews';

  constructor(private http: HttpClient, private auth: AuthServicesService) {}

  getTour(id:Number): Observable<TourSchema>{
    return this.http.get<TourSchema>(this.apiUrl + id);
  }

  getToursReviews(): Observable<any> {
    return this.auth.getToken().pipe(
      switchMap((token) => {
        if (token) {
          const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
          return this.http.get(this.GetReviewsForATour, { headers });
        } else {
          throw new Error('Token not found');
        }
      })
    );
  }
  getTours(params?: any): Observable<any> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach((key) => {
        if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }
    return this.http.get<TourSchema>(this.apiUrl, { params: httpParams });
  }


}
