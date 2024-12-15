import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { TourSchema } from '../../schema/tourSchema';
import { ReviewSchema } from '../../schema/reviewSchema';
import { AuthServicesService } from '../../services/Auth/auth-services.service';
@Injectable({
  providedIn: 'root',
})
export class TourServiceService {
  apiUrl = 'http://localhost:3000/api/v1/tours/';
  PostApiUrl = 'http://localhost:3000/api/v1/tours';
  GetReviewsForATourApi = 'http://localhost:3000/api/v1/tours/5c88fa8cf4afda39709c2955/reviews';

  constructor(private http: HttpClient, private auth: AuthServicesService) {}

  getTour(id: String | null): Observable<any> {
    return this.http.get<TourSchema>(this.apiUrl + id);
  }


  createTour(TourObject: FormData): Observable<any> {
    TourObject = this.FormChecker(TourObject);
    console.log('New  tour :');
    TourObject.forEach((key,value)=>{
      console.log(key,':',value);
    });

    return this.auth.getToken().pipe(
      switchMap((token) => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.post<TourSchema>(this.PostApiUrl, TourObject, { headers });
      })
    );
  }

  updateTour(id: String | null, UpdateObject: FormData): Observable<any> {
    UpdateObject = this.FormChecker(UpdateObject);

    return this.auth.getToken().pipe(
      switchMap((token) => {
        if (token) {
          const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
          return this.http.patch<TourSchema>(this.apiUrl + id, UpdateObject, { headers });
        } else {
          throw new Error('Token not found');
        }
      })
    );
  }

  deleteTour(id: string | undefined): Observable<any> {
    return this.auth.getToken().pipe(
      switchMap((token) => {
        if (token) {
          const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
          return this.http.delete<TourSchema>(this.apiUrl + id, { headers });
        } else {
          throw new Error('Token not found');
        }
      })
    );
  }

  getToursReviews(): Observable<any> {
    return this.auth.getToken().pipe(
      switchMap((token) => {
        if (token) {
          const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
          return this.http.get(this.GetReviewsForATourApi, { headers });
        } else {
          throw new Error('Token not found');
        }
      })
    );
  }

  FormChecker(formData: FormData): FormData {
    const filteredFormData = new FormData();

    formData.forEach((value, key) => {
      if (value !== null && value !== '' && !(Array.isArray(value) && value.length === 0)) {
        filteredFormData.append(key, value);
      }
    });

    return filteredFormData;
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
