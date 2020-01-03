import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewsService } from 'app/services/reviews.service';
import { AuthService } from 'app/services/auth.service';

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
  loggedInUserId: string;

  reviewEnabled: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private reviewsService: ReviewsService,
    private authService: AuthService
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
        const userInfo =
          JSON.parse(this.authService.loadUserInfo()) || 'No user data';
        this.loggedInUserId = userInfo.id;
        this.reviews.forEach(review => {
          if (review.user._id === userInfo.id) {
            this.reviewEnabled = false;
          }
        });
      }
    });
  }
}
