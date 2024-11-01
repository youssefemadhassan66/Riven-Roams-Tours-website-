import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServicesService } from '../../services/Auth/auth-services.service';
import { CustomValidators } from '../../services-utils/custom-validators/customValidators';
import { Router } from '@angular/router';
import { faHome, faLocationDot, faLock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;
  msg = '';
  ngOnInit(): void {
    this.signUpForm = new FormGroup(
      {
        username: new FormControl('', [Validators.required, Validators.minLength(6)]),
        password: new FormControl(null, [Validators.required, CustomValidators.passwordValidation()]),
        retypePassword: new FormControl(null, Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        photo: new FormControl(''),
      },
      { validators: CustomValidators.passwordMatches }
    );
  }
  constructor(private authServices: AuthServicesService, private router: Router) {}
  onFormSubmit() {
    console.log(this.signUpForm.value);
    const { username, password, retypePassword, email, photo } = this.signUpForm.value;
    this.authServices.signUp(username, email, password, retypePassword, photo).subscribe({
      next: () => this.router.navigate(['/home']),
      error: (error) => (this.msg = error.message),
    });
  }
}
