import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule,provideClientHydration } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { CarouselModule } from 'ngx-owl-carousel-o';


import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { SignupComponent } from './user/signup/signup.component';
import { MapComponent } from './map/map.component';
import { ToursComponent } from './tours/tours/tours.component';
import { TourDetailComponent } from './tours/tour-detail/tour-detail.component';
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { NavDashboardComponent } from './dashboard/nav-dashboard/nav-dashboard.component';
import { CreateNewTourComponent } from './tours/create-new-tour/create-new-tour.component';
import { UpdateTourComponent } from './tours/update-tour/update-tour.component';
import { AllDashboardComponent } from './dashboard/all-dashboard/all-dashboard.component';
import { UserDashboardComponent } from './dashboard/user-dashboard/user-dashboard.component';
import { BookingDashboardComponent } from './dashboard/booking-dashboard/booking-dashboard.component';
import { UserOptionsComponent } from './user/user-info/user-options/user-options.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    FooterComponent,
    AboutComponent,
    SignupComponent,
    MapComponent,
    ToursComponent,
    TourDetailComponent,
    ContactComponent,
    DashboardComponent,
    NavDashboardComponent,
    CreateNewTourComponent,
    UpdateTourComponent,
    AllDashboardComponent,
    UserDashboardComponent,
    BookingDashboardComponent,
    UserOptionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    CarouselModule,


  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    provideClientHydration(),
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

