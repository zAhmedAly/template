import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewsService } from 'app/services/reviews.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  bootcampId: string;
  reviews: any;
  bootcampName: string;
  averageRating: number;

  constructor(
    private route: ActivatedRoute,
    private reviewsService: ReviewsService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.bootcampId = params['bootcampId'];
      localStorage.setItem('returnUrl', `/reviews/${this.bootcampId}`);
    });

    this.reviewsService.getReviews(this.bootcampId).subscribe(reviews => {
      console.log('ReviewsComponent getReviews = ', reviews);
      if (reviews.success) {
        this.bootcampName = reviews.bootcampName;
        this.averageRating = reviews.averageRating
          ? reviews.averageRating.toFixed(1)
          : '';
        this.reviews = reviews.data;
        console.log(
          'ReviewsComponent getReviews this.reviews = ',
          this.reviews
        );
      }
    });
  }
}
