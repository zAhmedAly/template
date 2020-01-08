import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewsService } from 'app/services/reviews.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {
  bootcampId: string;
  reviews: any;
  bootcampName: string;

  title: string;
  review: string;
  rating: number;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private reviewsService: ReviewsService,
    private flashMessage: FlashMessagesService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.bootcampId = params['bootcampId'];
      localStorage.setItem('returnUrl', `/add-review/${this.bootcampId}`);
    });
  }

  onReviewSubmit() {
    const userInfo = JSON.parse(this.authService.loadUserInfo());

    const newReview = {
      title: this.title,
      text: this.review,
      rating: this.rating,
      bootcamp: this.bootcampId,
      user: userInfo.id
    };

    console.log('newReview =', newReview);
    this.reviewsService
      .addReview(this.bootcampId, newReview)
      .subscribe(result => {
        if (typeof result === 'object') {
          console.log('AddReviewComponent addReview = ', result);
          // if (result.success) {
          this.bootcampName = result.bootcampName;
          this.reviews = result.data;
          console.log(
            'AddReviewComponent addReview this.reviews = ',
            this.reviews
          );
          // } else {
          //   this.flashMessage.show('Error in adding review', {
          //     cssClass: 'alert-danger',
          //     timeout: 3000
          //   });
          // }
        } else {
          console.log('ReviewsComponent typeof(resolvedData) ', typeof result);
          console.log('Inside ReviewsComponent ERROR ... ', result);
          this.flashMessage.show(result, {
            cssClass: 'alert-danger',
            timeout: 5000
          });
        }
      });
  }
}
