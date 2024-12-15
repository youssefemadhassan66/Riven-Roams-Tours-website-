import { Component, OnInit } from '@angular/core';
import { TourServiceService } from '../../tours/tour-service/tour-service.service';
import { Router } from '@angular/router';
import { TourSchema } from '../../schema/tourSchema';
import { response } from 'express';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  side_dashBoard = [
    { name: 'Create A Tour', value: 'createTour' },
    { name: 'Tour Stats', value: 'TourStats' },
    { name: 'monthly-plan', value: 'monthlyPlan' },
  ];

  ToursPhotoUrl = 'http://localhost:3000/img/tours/';
  UsersPhotoUrl = 'http://localhost:3000/img/users/';
  DeleteConfirmation = false;
  index = 0;
  Tours: TourSchema[] = [];
  constructor(private tourService: TourServiceService, private router: Router) {}
  ngOnInit(): void {
    this.tourService.getTours({}).subscribe((response) => {
      this.Tours = response.data;
      console.log(this.Tours);
    });
  }
  findBYindex(indexToFind: number) {
    const tour = this.Tours.find((element, index) => {
      return index === indexToFind;
    });
    return tour;
  }
  navigateSideBar(element: string){
    console.log(element);
      this.router.navigate([`/${element}`]);

  }
  navigateViewModel(indexToFind: number) {
    const tour = this.findBYindex(indexToFind);
    this.router.navigate(['/tours', tour?.id]);
  }
  navigateEditModel(indexToFind: number) {
    const tour = this.findBYindex(indexToFind);
    this.router.navigate(['/tourEdit', tour?.id]);
  }

  onDeleteClick(indexToFind: number) {
    this.DeleteConfirmation = true;
    this.index = indexToFind;
    console.log(this.index);
  }
  cancelDelete() {
    this.DeleteConfirmation = false;
  }
  confirmDelete() {
    console.log(this.index);
    const tour = this.findBYindex(this.index);
    this.tourService.deleteTour(tour?.id).subscribe((response) => {
      console.log(response);
    });
    this.DeleteConfirmation = false;
  }
}
