import { Component, OnInit, AfterViewInit, input } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CustomValidators } from '../../services-utils/custom-validators/customValidators';
import { Router, ActivatedRoute } from '@angular/router';
import { TourServiceService } from '../tour-service/tour-service.service';
import { TourSchema } from '../../schema/tourSchema';
import { from } from 'rxjs';

@Component({
  selector: 'app-update-tour',
  templateUrl: './update-tour.component.html',
  styleUrl: './update-tour.component.css',
})
export class UpdateTourComponent implements OnInit, AfterViewInit {
  id: String | null = '';
  ToursPhotoUrl = 'http://localhost:3000/img/tours/';
  UsersPhotoUrl = 'http://localhost:3000/img/users/';
  selectedFile: File | null = null;
  tourForm!: FormGroup;
  constructor(private router: Router, private activeRoute: ActivatedRoute, private tourService: TourServiceService, private fb: FormBuilder) {}
  Tour: any;
  TourForm!: FormGroup;
  msg = '';
  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.paramMap.get('id');
    this.tourService.getTour(this.id).subscribe((response) => {
      this.Tour = response.data;
      console.log(response);
    });
    this.initForm();
  }
  ngAfterViewInit(): void {
    // this.viewImages();
  }
  initForm() {
    this.tourForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(50)]],
      duration: ['', Validators.required],
      maxGroupSize: ['', Validators.required],
      difficulty: ['', Validators.required],
      price: ['', Validators.required],
      priceDiscount: [''],
      bestSeller: [false],
      summary: ['', Validators.required],
      description: [''],
      imageCover: ['', Validators.required],
      images: this.fb.array([], [Validators.maxLength(5)]),
      startDates: this.fb.array([], [Validators.maxLength(3)]),
      secretTour: '',
      // startLocation: this.fb.group({
      //   coordinates: this.fb.array([0, 0]),
      //   address: '',
      //   description: '',
      // }),
    });
  }

  get images() {
    return this.tourForm.get('images') as FormArray;
  }
  get startDates() {
    return this.tourForm.get('startDates') as FormArray;
  }
  addDate() {
    if (this.startDates.length < 3) {
      this.startDates.push(this.fb.control(''));
    }
  }

  addImage() {
    if (this.images.length < 5) {
      this.images.push(this.fb.control('', Validators.required));
    }
  }
  removeImage(index: number) {
    this.images.removeAt(index);
  }
  removeDate(index: number) {
    this.startDates.removeAt(index);
  }
  onFileChange(event: Event) {
    const inputFile = event.target as HTMLInputElement;
    if (inputFile.files && inputFile.files.length > 0) {
      const file = inputFile.files[0];
      this.selectedFile = file;
      this.tourForm.get('imageCover')?.setValue(file);
    }
  }

  onFilesChange(event: Event, index: number) {
    const inputFile = event.target as HTMLInputElement;
    if (inputFile.files && inputFile.files.length > 0) {
      const file = inputFile.files[0];
      this.images.at(index).setValue(file);
    }
  }

  onSubmit() {
    const formData = new FormData();

    Object.keys(this.tourForm.controls).forEach((key) => {
      if (key !== 'imageCover') {
        const value = this.tourForm.get(key)?.value;
        if (value) {
          formData.append(key, value);
        }
      }
    });

    const Images = this.tourForm.get('images') as FormArray;
    Images.controls.forEach((imageControl, index) => {
      const imageFile = imageControl.value;
      if (imageFile) {
        formData.append('images', imageFile);
      }
    });

    if (this.selectedFile) {
      formData.append('imageCover', this.selectedFile);
    }


      this.tourService.updateTour(this.Tour.id, formData).subscribe(
        (response) => {
          console.log('Tour updated successfully:', response);
        },
        (error) => {
          console.error('Error updating tour:', error);
        }
      );
  }
}
