import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ReviewServiceService {
  apiUrl = 'http://localhost:3000/api/v1/tours/:tourId/reviews'
  constructor(private http :HttpClient) { }
}
