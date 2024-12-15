import { AfterViewInit, Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { faArrowRight, faGlobe, faFlag, faLocationDot, faCalendar, faBus, faUser } from '@fortawesome/free-solid-svg-icons';
import { trigger, style, animate, transition, query, group } from '@angular/animations';
import { TourServiceService } from '../tours/tour-service/tour-service.service';
import { TourSchema } from '../schema/tourSchema';
import { ReviewSchema } from '../schema/reviewSchema';
import { initializeSwiper, defaultSwiperOptions } from '../services/Animations';

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
  constructor(private tourService: TourServiceService) {}

  icons = [faLocationDot, faCalendar, faFlag, faUser];
  globe = faGlobe;
  ToursPhotoUrl = 'http://localhost:3000/img/tours/';
  UsersPhotoUrl = 'http://localhost:3000/img/users/';
  params = { limit: 3, difficulty: 'easy', 'price[gt]': 1000 };
  toursData: TourSchema[] = [];
  ReviewData: ReviewSchema[] = [];
  video = '/assets/videos/bit-landscape-1.mp4';

  ngOnInit(): void {
    this.tourService.getTours(this.params).subscribe((response) => {
      this.toursData = response.data;
      console.log(response);
    });
    this.tourService.getToursReviews().subscribe((response) => {
      this.ReviewData = response.data;
      console.log(response);
    });

    this.video = Math.random( ) > 0.5 ? '/assets/videos/bit-landscape-1.mp4' : '/assets/videos/bit-landscape-5.mp4';
  }
  ngAfterViewInit(): void {
    setInterval(() => {
      Math.random() > 0.5 ? this.nextSlide() : this.prevSlide();
    }, 20000);
    initializeSwiper('.swiper-container', defaultSwiperOptions);
  }

  formatDate(dateString: Date): string | Date {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
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
      icon: '/assets/logos/9.png',
      title: 'WorldWide Tours',
      description: 'going to use a passage of Lorem Ipsum, you need to be',
    },
    {
      icon: '/assets/logos/5.png',
      title: 'Your Journey Begins Now',
      description: 'going to use a passage of Lorem Ipsum, you need to be',
    },
    {
      icon: '/assets/logos/15.png',
      title: 'Your Journey Begins Now',
      description: 'going to use a passage of Lorem Ipsum, you need to be',
    },
    {
      icon: '/assets/logos/10.png',
      title: 'Your Journey Begins Now',
      description: 'going to use a passage of Lorem Ipsum, you need to be',
    },
    {
      icon: '/assets/logos/12.png',
      title: 'Your Journey Begins Now',
      description: 'going to use a passage of Lorem Ipsum, you need to be',
    },
  ];

  // Reviews Section
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: false,
  };
}

// translateX = 0;
// startX: number | null = null;
// dragSpeed = 1.5; // Adjust this value for sensitivity
// isDragging = false;

// startDragging(event: MouseEvent) {
//   this.startX = event.clientX;
//   this.isDragging = true;
// }

// stopDragging() {
//   this.startX = null;
//   this.isDragging = false;
// }

// onDrag(event: MouseEvent) {
//   if (this.isDragging && this.startX !== null) {
//     const moveX = (event.clientX - this.startX) * this.dragSpeed;
//     this.translateX += moveX;
//     this.startX = event.clientX;
//     this.ensureBounds();
//   }
// }

// ensureBounds() {
//   const itemWidth = (document.querySelector('.review-item') as HTMLElement).offsetWidth;
//   const totalWidth = itemWidth * this.ReviewData.length;

//   // Prevent dragging beyond the starting and ending boundaries
//   if (this.translateX > 0) {
//     this.translateX = 0;
//   } else if (this.translateX < -totalWidth + itemWidth * 3.5) {
//     this.translateX = -totalWidth + itemWidth * 3.5;
//   }
// }
