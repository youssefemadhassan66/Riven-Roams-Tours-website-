import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TourServiceService } from '../tour-service/tour-service.service';
import { TourSchema } from '../../schema/tourSchema';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faArrowRight, faGlobe, faFlag, faLocationDot, faCalendar, faBus, faUser, faFilter } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrl: './tours.component.css',
})
export class ToursComponent implements OnInit {
  icons = [faLocationDot, faCalendar, faFlag, faUser];
  ToursPhotoUrl = 'http://localhost:3000/img/tours/';
  UsersPhotoUrl = 'http://localhost:3000/img/users/';
  filterForm!: FormGroup;
  filterIcon = faFilter;
  showModal = false;
  pageIndex = 1;
  limit = 6;
  totalPageCounts = 0;

  toursData: TourSchema[] = [];
  maxPrice = 1000;
  params = {
    page: this.pageIndex,
    limit: this.limit,
    difficulty: '',
    'ratingsAverage[lte]': '',
    'price[lte]': '',
    sort: '',
  };
  GetTours(params: any) {
    this.tourService.getTours(params).subscribe((response) => {
      this.toursData = response.data;
      this.totalPageCounts = Math.ceil(response.total_Counts / this.limit);
      console.log(response);
    });
  }
  constructor(private tourService: TourServiceService ,private router:Router) {}
  ngOnInit(): void {
    this.GetTours(this.params);

    this.filterForm = new FormGroup({
      selectedDifficulty: new FormControl(''),
      selectedRating: new FormControl(''),
      selectedPrice: new FormControl(1000),
    });
  }
  onSortChange(event: Event) {
    const sortValue = (event.target as HTMLSelectElement).value;
    console.log('User selected:', sortValue);
    this.params.sort = sortValue;
    this.GetTours(this.params);
  }

  openFilters() {
    this.showModal = true;
  }

  onFilterSubmit() {
    this.showModal = false;
    this.params = {
      ...this.params,
      difficulty: this.filterForm.get('selectedDifficulty')?.value,
      'ratingsAverage[lte]': this.filterForm.get('selectedRating')?.value,
      'price[lte]': this.filterForm.get('selectedPrice')?.value,
    };
    this.GetTours(this.params);
  }

  sortOptions = [
    { label: 'Newest', value: 'createdAt' },
    { label: 'Price Low to High', value: '-price' },
    { label: 'Price High to Low', value: 'price' },
    { label: 'Rating Low to High', value: '-ratingsAverage' },
    { label: 'Rating High to Low', value: 'ratingsAverage' },
    { label: 'More Reviews', value: '' },
  ];
  difficultyOptions = [
    { label: 'ALL', value: '' },
    { label: 'Easy', value: 'easy' },
    { label: 'Medium', value: 'medium' },
    { label: 'Hard', value: 'difficult' },
  ];
  ratingOptions = [
    { label: 'All', value: '6' },
    { label: '5', value: '5' },
    { label: '4', value: '4' },
    { label: '3', value: '3' },
    { label: '2', value: '2' },
    { label: '1', value: '1' },
  ];
  getPageNumbers(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPageCounts; i++) {
      pages.push(i);
    }
    return pages;
  }
  updatePriceValue() {
    const priceRangeElement = document.getElementById('priceRange') as HTMLInputElement;
    this.maxPrice = parseInt(priceRangeElement.value, 10);
    const percentage = (this.maxPrice / parseInt(priceRangeElement.max, 10)) * 100;
    priceRangeElement.style.background = `linear-gradient(to right, #134e4a ${percentage}%, #cbd5e1 ${percentage}%)`;
  }

  formatDate(dateString: Date): string | Date {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  }

  navTourDetail(indexToFind:number){
    const tour = this.toursData.find((element,index)=>{
      return index===indexToFind;
    }) ;
    console.log(tour?.id);
    this.router.navigate(['/tours', tour?.id]);
  }

  //// Pagination
  next() {
    if (this.pageIndex < this.totalPageCounts) this.pageIndex++;
    this.params.page=this.pageIndex;
    this.GetTours(this.params);
  }
  prev() {
    if (this.pageIndex > 1) this.pageIndex--;
    this.params.page=this.pageIndex;
    this.GetTours(this.params);
  }
  setPage(page:number) {
    this.pageIndex = page
    this.params.page = this.pageIndex;
    this.GetTours(this.params);
  }
}
