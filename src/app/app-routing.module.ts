import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { AboutComponent } from './about/about.component';
import { SignupComponent } from './user/signup/signup.component';
import { authGuard } from './guard/auth.guard';
import { MapComponent } from './map/map.component';
import { ToursComponent } from './tours/tours/tours.component';
import { TourDetailComponent } from './tours/tour-detail/tour-detail.component';
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { UpdateTourComponent } from './tours/update-tour/update-tour.component';
import { CreateNewTourComponent } from './tours/create-new-tour/create-new-tour.component';
import { AllDashboardComponent } from './dashboard/all-dashboard/all-dashboard.component';
import { UserDashboardComponent } from './dashboard/user-dashboard/user-dashboard.component';
import { BookingDashboardComponent } from './dashboard/booking-dashboard/booking-dashboard.component';
const routes: Routes = [

  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'map', component: MapComponent },
  { path: 'about', component: AboutComponent,  },
  { path: 'contact', component: ContactComponent },
  { path: 'signUp', component: SignupComponent },
  { path: 'tours', component: ToursComponent },
  { path: 'tours/:id', component: TourDetailComponent },
  {path:'tourEdit/:id',component:UpdateTourComponent,canActivate: [authGuard]},
  {path :'createTour',component:CreateNewTourComponent},
  {path: 'dashboard',component:AllDashboardComponent },
  {path: 'tourDashboard',component:DashboardComponent },
  {path: 'userDashboard',component:UserDashboardComponent },
  {path: 'bookingDashboard',component:BookingDashboardComponent },

  { path: '', redirectTo: '/home', pathMatch: 'full' }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
