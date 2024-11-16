import Swiper from 'swiper';

export function initializeSwiper(selector: string, options: any) {
  return new Swiper(selector, options);
}
export const defaultSwiperOptions = {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  // Remove or comment out the navigation options
  // navigation: {
  //   nextEl: '.swiper-button-next',
  //   prevEl: '.swiper-button-prev',
  // },
  breakpoints: {
    640: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 50,
    },
  },
};
