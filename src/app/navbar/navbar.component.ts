import { Component } from '@angular/core';
import {
  faHome,
  faLocationDot,
  faMoon,
  faUserCircle,
  faMapLocationDot,
  faCompass,
  faInfoCircle,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  user = faUserCircle;
  darkMode = faMoon;
  navbarList: any = [
    { icon: faHome, name: 'Home' },
    { icon: faMapLocationDot, name: 'Tours' },
    { icon: faInfoCircle, name: 'About' },
    { icon: faPaperPlane, name: 'contact' },
    { icon: faCompass, name: 'services' },
  ];
}
