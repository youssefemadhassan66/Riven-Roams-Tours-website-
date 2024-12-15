import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TourServiceService } from '../tour-service/tour-service.service';

@Component({
  selector: 'app-create-new-tour',
  templateUrl: './create-new-tour.component.html',
  styleUrls: ['./create-new-tour.component.css'],
})
export class CreateNewTourComponent implements OnInit {
  tourForm!: FormGroup;
  msg = '';
  selectedFile: File | null = null;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private tourService: TourServiceService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.syncStartLocationWithFirstLocation();
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
    secretTour: [false],
    startLocation: this.fb.group({
      address: [''],
      description: [''],
      coordinates: this.fb.array([0, 0]),
      day: [0],
    }),
    locations: this.fb.array([
      this.fb.group({
        address: ['', Validators.required],
        description: ['', Validators.required],
        coordinates: this.fb.array([0, 0], [Validators.required]),
        day: ['', Validators.required],
      }),
    ]),
  });
}
syncStartLocationWithFirstLocation() {
  // Subscribe to changes in the first location
  this.locations.at(0).valueChanges.subscribe((firstLocation) => {
    this.tourForm.get('startLocation')?.patchValue(firstLocation);
  });
}

  // Accessors for FormArray
  get images() {
    return this.tourForm.get('images') as FormArray;
  }
  get startDates() {
    return this.tourForm.get('startDates') as FormArray;
  }
  get locations() {
    return this.tourForm.get('locations') as FormArray;
  }

  // Methods to handle dynamic fields
  addDate() {
    if (this.startDates.length < 3) {
      this.startDates.push(this.fb.control('', Validators.required));
    }
  }

  removeDate(index: number) {
    this.startDates.removeAt(index);
  }

  addImage() {
    if (this.images.length < 5) {
      this.images.push(this.fb.control('', Validators.required));
    }
  }

  removeImage(index: number) {
    this.images.removeAt(index);
  }

  addLocation() {
    this.locations.push(
      this.fb.group({
        address: ['', Validators.required],
        description: ['', Validators.required],
        coordinates: this.fb.array([0, 0], [Validators.required]), // Longitude & Latitude
        day: ['', Validators.required],
      })
    );
  }

  removeLocation(index: number) {
    this.locations.removeAt(index);
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

    // Sync startLocation with the first location in the locations array
    const firstLocation = this.locations.at(0).value;
    this.tourForm.get('startLocation')?.patchValue(firstLocation);

    // Append all other form data except arrays like images, locations, and startDates
    Object.keys(this.tourForm.controls).forEach((key) => {
      if (key !== 'images' && key !== 'locations' && key !== 'startDates' && key !== 'imageCover' && key !== 'startLocation') {
        const value = this.tourForm.get(key)?.value;
        if (value) {
          formData.append(key, value);
        }
      }
    });

    // Append images
    this.images.controls.forEach((imageControl) => {
      const imageFile = imageControl.value;
      if (imageFile) {
        formData.append('images', imageFile);
      }
    });

    // Append start dates
    this.startDates.controls.forEach((dateControl) => {
      const dateValue = dateControl.value;
      if (dateValue) {
        formData.append('startDates', dateValue);
      }
    });

    // Append startLocation
    const startLocation = this.tourForm.get('startLocation')?.value;
    if (startLocation) {
      formData.append('startLocation[address]', startLocation.address);
      formData.append('startLocation[description]', startLocation.description);
      if (Array.isArray(startLocation.coordinates)) {
        formData.append('startLocation[coordinates][0]', startLocation.coordinates[0]);
        formData.append('startLocation[coordinates][1]', startLocation.coordinates[1]);
      }
      formData.append('startLocation[day]', startLocation.day);
    }

    // Append locations
    this.locations.controls.forEach((locationControl, index) => {
      const location = locationControl.value;

      if (location.coordinates && Array.isArray(location.coordinates)) {
        formData.append(`locations[${index}][coordinates][0]`, location.coordinates[0]);
        formData.append(`locations[${index}][coordinates][1]`, location.coordinates[1]);
      } else {
        console.error(`Invalid coordinates format for location ${index}`);
      }

      formData.append(`locations[${index}][address]`, location.address);
      formData.append(`locations[${index}][description]`, location.description);
      formData.append(`locations[${index}][day]`, location.day);
    });

    // Append cover image
    if (this.selectedFile) {
      formData.append('imageCover', this.selectedFile);
    }

    // Submit the form data to the server
    this.tourService.createTour(formData).subscribe({
      next: (response) => {
        this.msg = 'Tour created successfully!';
        this.router.navigate(['/tours']);
      },
      error: (error) => {
        this.msg = 'Error creating the tour. Please try again.';
        console.error(error);
      },
    });
  }

}
