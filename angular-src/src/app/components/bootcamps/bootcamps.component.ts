import { Component, OnInit } from '@angular/core';
import { BootcampsService } from 'app/services/bootcamps.service';
import {
  Event,
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationError,
  NavigationCancel,
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'app-bootcamps',
  templateUrl: './bootcamps.component.html',
  styleUrls: ['./bootcamps.component.css']
})
export class BootcampsComponent implements OnInit {
  bootcamps: [any];
  bootcampsList: [any];

  careerList = '';
  showLoadingIndicator = true;

  constructor(
    private bootcampsService: BootcampsService,
    private _route: ActivatedRoute
  ) {
    this.bootcampsList = this._route.snapshot.data['bootcampsList'];
    console.log(
      'BootcampsComponent constructor this.bootcampsList = ',
      this.bootcampsList
    );
  }

  ngOnInit() {
    localStorage.setItem('returnUrl', '/bootcamps');

    // this.bootcampsService.getBootcamps().subscribe(bootcamps => {
    //   if (bootcamps.success) {
    //     console.log('bootcamps = ', bootcamps);

    //     this.bootcamps = bootcamps.data;

    this.bootcamps = this.bootcampsList['data'];

    console.log('this.bootcamps = ', this.bootcamps);

    for (const i in this.bootcamps) {
      if (this.bootcamps.hasOwnProperty(i)) {
        const element = this.bootcamps[i];
        this.bootcamps[i].careerList = '';
        this.bootcamps[i].averageRating = this.bootcamps[i].averageRating
          ? this.bootcamps[i].averageRating.toFixed(1)
          : '';
        for (const j in this.bootcamps[i].careers) {
          if (this.bootcamps[i].careers.hasOwnProperty(j)) {
            this.bootcamps[i].careerList += this.bootcamps[i].careers[j] + ', ';
          }
        }
        this.bootcamps[i].careerList = this.bootcamps[i].careerList.replace(
          /,\s*$/,
          ''
        );
      }
    }

    console.log('this.bootcamps = ', this.bootcamps);

    // for (const i in this.bootcamps) {
    //   this.bootcamps[i].careerList = '';
    //   this.bootcamps[i].averageRating = this.bootcamps[i].averageRating
    //     ? this.bootcamps[i].averageRating.toFixed(1)
    //     : '';
    //   for (const j in this.bootcamps[i].careers) {
    //     this.bootcamps[i].careerList += this.bootcamps[i].careers[j] + ', ';
    //   }
    //   this.bootcamps[i].careerList = this.bootcamps[i].careerList.replace(
    //     /,\s*$/,
    //     ''
    //   );
    // }
  }
  // });
  // }
}
