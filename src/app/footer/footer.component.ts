import { Component } from '@angular/core';
import {faUser,faAngleRight} from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faDiscord,faLinkedin,faTwitter } from '@fortawesome/free-brands-svg-icons';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  readonly count = 5;
  servicesList = ['Home', 'About', 'Tours','Services','Contact'];
  AngleRight = faAngleRight;
  socialLinks = [faFacebook,faDiscord,faTwitter,faLinkedin];
}
