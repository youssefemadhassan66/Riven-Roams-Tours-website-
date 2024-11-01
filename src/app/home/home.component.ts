import { AfterViewInit, Component, OnInit } from '@angular/core';
import Swiper from 'swiper';
import { faArrowRight, faGlobe, faMountainSun, faPersonHiking, faUmbrellaBeach, faBus, faUser } from '@fortawesome/free-solid-svg-icons';
import { trigger, style, animate, transition, query, group } from '@angular/animations';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  animations: [
    trigger('slideAnimation', [
      transition(':enter', [style({ transform: 'translateX({{offset}}%)' }), animate('0.5s ease', style({ transform: 'translateX(0%)' }))], {
        params: { offset: 100 },
      }),
      transition(':leave', [animate('0.5s ease', style({ transform: 'translateX({{offset}}%)' }))], { params: { offset: -100 } }),
    ]),
  ],
})
export class HomeComponent implements OnInit, AfterViewInit {
  constructor() {}
  ngOnInit(): void {}

  ngAfterViewInit() {
    setInterval(() => {
      Math.random() > 0.5 ? this.nextSlide() : this.prevSlide();
    }, 20000);
  }

  rightArrow = faArrowRight;
  currentIndex = 0;
  direction = 'next';

  slides: any = [
    {
      image: '/assets/photos/pexels-mo-eid-1268975-18876976.jpg',
      preTitle: 'Tours & Travels',
      title: "Let's Discover The World Together",
    },
    {
      image: '/assets/photos/pexels-quang-nguyen-vinh-222549-2161449.jpg',
      preTitle: 'Tours & Travels',
      title: 'Discover Amazing Places With Us',
    },
    {
      image: '/assets/photos/pexels-marek-piwnicki-3907296-26558807.jpg',
      preTitle: 'Tours & Travels',
      title: 'Your Journey Begins Now',
    },
  ];

  nextSlide() {
    this.direction = 'next';
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  prevSlide() {
    this.direction = 'prev';
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }

  get offset() {
    return this.direction === 'next' ? 100 : -100;
  }

  slideNav(index: number) {
    this.direction = index > this.currentIndex ? 'next' : 'prev';
    this.currentIndex = index;
  }
  // Home-about-section
  featuresList = ['First Class Flights', '5 Star Accommodations', 'latest model vehicles', '24/7 services'];

  // Home-services-section
  cards: any = [
    {
      icon: faGlobe,
      title: 'WorldWide Tours',
      description: 'going to use a passage of Lorem Ipsum, you need to be',
    },
    {
      icon: faBus,
      title: 'Your Journey Begins Now',
      description: 'going to use a passage of Lorem Ipsum, you need to be',
    },
    {
      icon: faMountainSun,
      title: 'Your Journey Begins Now',
      description: 'going to use a passage of Lorem Ipsum, you need to be',
    },
    {
      icon: faUmbrellaBeach,
      title: 'Your Journey Begins Now',
      description: 'going to use a passage of Lorem Ipsum, you need to be',
    },
    {
      icon: faUser,
      title: 'Your Journey Begins Now',
      description: 'going to use a passage of Lorem Ipsum, you need to be',
    },
  ];
}
