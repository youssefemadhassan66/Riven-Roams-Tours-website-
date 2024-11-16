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
    { icon: faHome, name: 'home' },
    { icon: faMapLocationDot, name: 'tours' },
    { icon: faCompass, name: 'about' },
    { icon: faPaperPlane, name: 'contact' },

  ];
}
