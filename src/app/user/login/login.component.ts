import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServicesService } from '../../services/Auth/auth-services.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  msg = '';
  constructor(private _auth: AuthServicesService, private _router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),

    });
  }

  onFormSubmit() {
    console.log(this.loginForm.value);
    const { email, password } = this.loginForm.value;
    this._auth.login(email, password).subscribe({
      next: () => this._router.navigate(['/home']),
      error: (error) => (this.msg = error.message),
    });
  }
}
