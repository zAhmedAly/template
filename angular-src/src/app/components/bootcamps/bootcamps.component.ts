import { Component, OnInit } from '@angular/core';
import { BootcampsService } from 'app/services/bootcamps.service';

@Component({
  selector: 'app-bootcamps',
  templateUrl: './bootcamps.component.html',
  styleUrls: ['./bootcamps.component.css']
})
export class BootcampsComponent implements OnInit {
  bootcamps: [any];
  careerList = '';

  constructor(private bootcampsService: BootcampsService) {}

  ngOnInit() {
    localStorage.setItem('returnUrl', '/bootcamps');

    this.bootcampsService.getBootcamps().subscribe(bootcamps => {
      if (bootcamps.success) {
        console.log('bootcamps = ', bootcamps);

        this.bootcamps = bootcamps.data;

        console.log('bootcampList = ', this.bootcamps);

        for (let i in this.bootcamps) {
          this.bootcamps[i].careerList = '';
          for (let j in this.bootcamps[i].careers) {
            this.bootcamps[i].careerList += this.bootcamps[i].careers[j] + ', ';
          }
          this.bootcamps[i].careerList = this.bootcamps[i].careerList.replace(
            /,\s*$/,
            ''
          );
        }

        console.log(this.bootcamps);
      }
    });
  }
}
