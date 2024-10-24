import { AfterViewInit, Component, OnInit } from '@angular/core';
import Swiper from 'swiper';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, AfterViewInit {
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    setInterval(() => {
      Math.random() > 0.5 ? this.nextSlide() : this.prevSlide();
    }, 20000);
  }

  isActive: boolean = true;
  currentIndex: number = 0;

  slides: any = [
    {
      image: '/assets/photos/pexels-mo-eid-1268975-18876976.jpg',
      preTitle: 'Tours & Travels',
      title: 'Your Journey Begins Now',
    },
    {
      image: '/assets/photos/pexels-quang-nguyen-vinh-222549-2161449.jpg',
      preTitle: 'Tours & Travels',
      title: 'Your Journey Begins Now',
    },
    {
      image: '/assets/photos/pexels-asadphoto-2549017.jpg',
      preTitle: 'Tours & Travels',
      title: 'Your Journey Begins Now',
    },
  ];

  prevSlide() {
    this.currentIndex = this.currentIndex === 0 ? this.slides.length - 1 : this.currentIndex - 1;
  }

  nextSlide() {
    this.currentIndex = this.currentIndex === this.slides.length - 1 ? 0 : this.currentIndex + 1;
  }
}
