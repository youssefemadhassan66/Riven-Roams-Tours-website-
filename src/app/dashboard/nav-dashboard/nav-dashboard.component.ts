import { Component, OnInit } from '@angular/core';
import {
  faHome,
  faLocationDot,
  faMoon,
  faUserCircle,
  faMapLocationDot,
  faCompass,
  faInfoCircle,
  faPaperPlane,
  faBook,
  faRightFromBracket,
  faJournalWhills,
} from '@fortawesome/free-solid-svg-icons';
import { AuthServicesService } from '../../services/Auth/auth-services.service';
import { UserServiceService } from '../../user/user-serv/user-service.service';
@Component({
  selector: 'app-nav-dashboard',
  templateUrl: './nav-dashboard.component.html',
  styleUrl: './nav-dashboard.component.css',
})
export class NavDashboardComponent implements OnInit {
  constructor(private auth: AuthServicesService, private User: UserServiceService) {}
  logOut = faRightFromBracket;
  IsLoggedIn!: Boolean;
  useData: any;
  user = faUserCircle;
  darkMode = faMoon;
  UsersPhotoUrl = 'http://localhost:3000/img/users/';
  ngOnInit(): void {
    this.IsLoggedIn = this.auth.isAuthenticated();
    this.User.GetUser().subscribe((res) => {
      this.useData = res.data;
      console.log('res', this.useData);
    });
  }

  onLogout() {
    this.auth.logOut();
  }

  navbarList: any = [
    { icon: faHome, name: 'dashboard' },
    { icon: faMapLocationDot, name: 'tourDashboard' },
    { icon: faUserCircle, name: 'userDashboard' },
    { icon: faBook, name: 'bookingDashboard' },
    { icon: faJournalWhills, name: 'reviews' },
  ];
}
