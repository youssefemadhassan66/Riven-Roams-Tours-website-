import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user/user-serv/user-service.service';
import { faArrowRight, faGlobe, faFlag, faLocationDot, faCalendar, faCog, faBus, faHotel, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent implements OnInit {
  LeadGuidesData: any;
  UsersPhotoUrl = 'http://localhost:3000/img/users/';
  icons = [faHotel, faUser, faCog, faCalendar, faFlag];
  cards: any = [
    {
      icon: faGlobe,
      title: 'WorldWide Tours',
      description: 'Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam',
    },
    {
      icon: faHotel,
      title: 'Hotel Reservation',
      description: 'Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam',
    },
    {
      icon: faCog,
      title: 'Event Management',
      description: 'Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam',
    },
    {
      icon: faUser,
      title: 'Travel Guides',
      description: 'Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam',
    },
    {
      icon: faCalendar,
      title: 'Any Time of the Year',
      description: 'Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam',
    },
  ];
  constructor(private User: UserServiceService) {}
  ngOnInit(): void {
    this.User.GetUsers().subscribe((response) => {
      this.LeadGuidesData = response.data;
      console.log(this.LeadGuidesData);
    });
  }
}
