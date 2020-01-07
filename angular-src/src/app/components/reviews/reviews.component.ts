import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewsService } from 'app/services/reviews.service';
import { AuthService } from 'app/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  bootcampId: string;
  reviews: any;
  reviewsList: [any] | string;
  bootcampName: string;
  averageRating: number;
  loggedInUserId: string;

  reviewEnabled: boolean = true;
  error: string = null;

  constructor(
    private _route: ActivatedRoute,
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) {
    console.log('ReviewsComponent constructor =====');

    const resolvedData: [any] | string = this._route.snapshot.data[
      'reviewsList'
    ];

    console.log('ReviewsComponent resolvedData =', resolvedData);
    console.log('ReviewsComponent typeof(resolvedData) ', typeof resolvedData);
    if (typeof resolvedData === 'object') {
      console.log('Inside ReviewsComponent resolvedData ');
      this.reviewsList = resolvedData;
      console.log(
        'ReviewsComponent constructor this.reviewsList = ',
        this.reviewsList
      );
    } else {
      console.log(
        'ReviewsComponent typeof(resolvedData) ',
        typeof resolvedData
      );

      this.error = resolvedData;
      console.log('Inside ReviewsComponent ERROR ... ' + this.error);
      this.flashMessage.show(this.error, {
        cssClass: 'alert-danger',
        timeout: 5000
      });
      //this.router.navigate(['/']);
      const returnUrlx = localStorage.getItem('returnUrl');
      this.router.navigateByUrl(returnUrlx);
    }
  }

  ngOnInit() {
    if (this.error === null) {
      this._route.params.subscribe(params => {
        console.log('ReviewsComponent ngOnInit route.params ', params);
        this.bootcampId = params['bootcampId'];
        localStorage.setItem('returnUrl', `/reviews/${this.bootcampId}`);
      });

      // this.reviewsService.getReviews(this.bootcampId).subscribe(reviews => {
      //   console.log('ReviewsComponent getReviews = ', reviews);
      //   if (reviews.success) {

      this.bootcampName = this.reviewsList['bootcampName'];
      this.averageRating = this.reviewsList['averageRating']
        ? this.reviewsList['averageRating'].toFixed(1)
        : '';
      this.reviews = this.reviewsList['data'];
      console.log('ReviewsComponent getReviews this.reviews = ', this.reviews);
      const userInfo =
        JSON.parse(this.authService.loadUserInfo()) || 'No user data';
      this.loggedInUserId = userInfo.id;
      this.reviews.forEach(review => {
        if (review.user._id === userInfo.id) {
          this.reviewEnabled = false;
        }
      });
    }
    //   });
    // }
  }
}
