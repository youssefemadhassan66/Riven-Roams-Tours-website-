import { Component,OnInit } from '@angular/core';
import { faArrowRight, faGlobe, faFlag, faLocationDot,faPhone,faMailBulk} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent  implements OnInit{
  video = `/assets/videos/bit-landscape-1.mp4`;
  cards: any = [
      {
        icon: faLocationDot,
        title: 'Office',
        description: '123 Street, New York, USA',
      },
      {
        icon:faPhone ,
        title: 'Mobile',
        description: '+01122334411',
      },
      {
        icon: faMailBulk,
        title: 'Email',
        description: 'Raivin@RavinRoamd.com',
      },

    ];
  ngOnInit(): void {
    const VideoNumber = Math.ceil(Math.random() * 5)
    this.video = `/assets/videos/${VideoNumber}.mp4`;
    console.log(this.video);
  }
}
