import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TourServiceService } from '../tour-service/tour-service.service';
import { TourSchema } from '../../schema/tourSchema';
import { OwlOptions } from 'ngx-owl-carousel-o';

import * as mapboxgl from 'mapbox-gl';
@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html',
  styleUrl: './tour-detail.component.css',
})
export class TourDetailComponent implements OnInit, AfterViewInit {
  id: String | null = '';
  tourData!: TourSchema;
  map!: mapboxgl.Map;
  ToursPhotoUrl = 'http://localhost:3000/img/tours/';
  UsersPhotoUrl = 'http://localhost:3000/img/users/';
  constructor(private route: ActivatedRoute, private tourService: TourServiceService) {}
  ngOnInit(): void {
    mapboxgl.default.accessToken = 'pk.eyJ1IjoieW91c3NlZmVtYWQ2NiIsImEiOiJjbTMwNmo4Y3kwa253MmxzN2Qyajh3emloIn0.6BOUgfpefp3Ks8-Ug3FbYw';
    this.id = this.route.snapshot.paramMap.get('id');
    this.tourService.getTour(this.id).subscribe((response) => {
      this.tourData = response.data;
      console.log(response);
    });
  }
  ngAfterViewInit(): void {
    this.initializeMap();
  }


  formatDate(dateString: Date): string | Date {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  }


 customOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: true,
  dots: true,
  navSpeed: 700,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 4
    }
  },
  nav: false
}



















  // Map
  locations = [
    { lng: -113.0263, lat: 37.2982, label: 'Day 1: Zion Canyon National Park' },
    { lng: -111.3762, lat: 36.8619, label: 'Day 4: Antelope Canyon' },
    { lng: -112.1103, lat: 36.1069, label: 'Day 5: Grand Canyon National Park' },
    { lng: -116.3131, lat: 34.0113, label: 'Day 9: Joshua Tree National Park' },
    // Add more locations as needed
  ];

  initializeMap(): void {
    this.map = new mapboxgl.Map({
      container: 'map', // HTML container ID
      style: 'mapbox://styles/mapbox/light-v10', // Light-themed map style
      center: [this.locations[0].lng, this.locations[0].lat], // Starting position
      zoom: 5,
      scrollZoom: false, // Disable zooming with the mouse scroll wheel
      dragPan: true, // Disable panning
      doubleClickZoom: false, // Disable double-click zoom
    });

    this.map.on('load', () => {
      this.addMarkersToMap();
    });
  }

  addMarkersToMap(): void {
    this.locations.forEach((location) => {
      const popup = new mapboxgl.Popup({ offset: 25 }).setText(location.label);

      new mapboxgl.Marker({ color: 'green' }) // Set marker color
        .setLngLat([location.lng, location.lat])
        .setPopup(popup) // Attach the popup to the marker
        .addTo(this.map);
    });

    // Optionally, fit the map to the bounds of all locations
    const bounds = new mapboxgl.LngLatBounds();
    this.locations.forEach((location) => bounds.extend([location.lng, location.lat]));
    this.map.fitBounds(bounds, { padding: 50 });
  }
}
