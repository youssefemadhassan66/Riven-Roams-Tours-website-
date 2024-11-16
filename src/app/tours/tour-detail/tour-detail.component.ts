import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TourServiceService } from '../tour-service/tour-service.service';
import { TourSchema } from '../../schema/tourSchema';
@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html',
  styleUrl: './tour-detail.component.css'
})
export class TourDetailComponent implements OnInit {
  id: String|null ='';
  constructor(private route:ActivatedRoute){}
  ngOnInit(): void {
      this.id = this.route.snapshot.paramMap.get('id');
  }

}
