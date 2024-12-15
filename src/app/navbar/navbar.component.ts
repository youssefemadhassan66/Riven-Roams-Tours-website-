import { Component,OnInit } from '@angular/core';
import {
  faHome,
  faLocationDot,
  faMoon,
  faUserCircle,
  faMapLocationDot,
  faCompass,
  faRightFromBracket,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';
import { AuthServicesService } from '../services/Auth/auth-services.service';
import { UserServiceService } from '../user/user-serv/user-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  constructor(private auth:AuthServicesService,private User:UserServiceService){}
  IsLoggedIn !: Boolean;
  useData :any;
  UsersPhotoUrl = 'http://localhost:3000/img/users/';
  ngOnInit(): void {
      this.IsLoggedIn =this.auth.isAuthenticated();
      this.User.GetUser().subscribe((res)=>{
        this.useData = res.data;
        console.log('res',this.useData);
      })
  }
  user = faUserCircle;
  logOut = faRightFromBracket;
  darkMode = faMoon;
  navbarList: any = [
    { icon: faHome, name: 'home' },
    { icon: faMapLocationDot, name: 'tours' },
    { icon: faCompass, name: 'about' },
    { icon: faPaperPlane, name: 'contact' },
    { icon: faLocationDot, name: 'dashboard' },

  ];
  
  onLogout(){
    this.auth.logOut();
  }
}
