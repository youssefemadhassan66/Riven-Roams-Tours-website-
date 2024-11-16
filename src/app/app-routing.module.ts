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
const routes: Routes = [

  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'map', component: MapComponent },
  { path: 'about', component: AboutComponent, canActivate: [authGuard] },
  { path: 'signUp', component: SignupComponent },
  { path: 'tours', component: ToursComponent },
  { path: 'tours/:id', component: TourDetailComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
