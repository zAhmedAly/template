import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { BootcampsService } from 'app/services/bootcamps.service';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-list-bootcamp',
  templateUrl: './list-bootcamp.component.html',
  styleUrls: ['./list-bootcamp.component.css']
})
export class ListBootcampComponent implements OnInit {
  style = 'mapbox://styles/mapbox/streets-v11';
  lng: number = -71.104028;
  lat: number = 42.350846;
  bootcampId: string = null;
  bootcamp: any;
  bootcampCourses: any;
  bootcampReviews: any;
  bootcampReviewCount: any;

  avgCourseCostText = 'Average Course Cost: ';

  bootcampName: string = null;
  bootcampDesc: string = null;
  averageCost: number = null;
  averageRating: any;
  housing: boolean = false;
  jobAssistance: boolean = false;
  jobGuarantee: boolean = false;
  acceptGi: boolean = false;
  slug: string = null;

  isLoading: boolean = false;

  reviewEnabled: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private bootcampsService: BootcampsService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isLoading = true;

    var lng = 0.0;
    var lat = 0.0;
    var slug = '';
    this.route.params.subscribe(params => {
      this.bootcampId = params['bootcampId'];
      localStorage.setItem('returnUrl', `/list-bootcamp/${this.bootcampId}`);
    });

    this.bootcampsService.getBootcamp(this.bootcampId).subscribe(bootcamp => {
      console.log('ListBootcampComponent bootcamp = ', bootcamp);
      if (bootcamp.success) {
        this.isLoading = false;

        this.bootcamp = bootcamp.data;

        const averageRating = Number(this.bootcamp.averageRating)
          ? Number(this.bootcamp.averageRating).toFixed(1)
          : 0;

        this.averageRating = averageRating;

        console.log('ListBootcampComponent this.bootcamp = ', this.bootcamp);

        lng = Number(this.bootcamp.location.coordinates[0]);
        lat = Number(this.bootcamp.location.coordinates[1]);

        this.bootcampName = this.bootcamp.name;
        this.bootcampDesc = this.bootcamp.description;
        this.averageCost = this.bootcamp.averageCost;
        this.housing = this.bootcamp.housing;
        this.jobAssistance = this.bootcamp.jobAssistance;
        this.jobGuarantee = this.bootcamp.jobGuarantee;
        this.acceptGi = this.bootcamp.acceptGi;
        slug = this.bootcamp.slug;

        this.bootcampCourses = this.bootcamp.courses;
        this.bootcampReviewCount = this.bootcamp.reviewCount;
        this.bootcampReviews = this.bootcamp.reviews;

        const userInfo =
          JSON.parse(this.authService.loadUserInfo()) || 'No user data';

        this.bootcampReviews.forEach(review => {
          if (review.user === userInfo.id) {
            this.reviewEnabled = false;
          }
        });

        console.log(
          'ListBootcampComponent this.bootcampCourses = ',
          this.bootcampCourses
        );

        console.log(
          'ListBootcampComponent this.bootcampReviewCount = ',
          this.bootcampReviewCount
        );

        console.log(
          'ListBootcampComponent this.bootcampReviews = ',
          this.bootcampReviews
        );

        let mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
        mapboxgl.accessToken = environment.mapbox.accessToken;
        let map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v11',
          zoom: 13,
          center: [lng, lat]
          // interactive: false
        });

        map.on('load', function() {
          map.addLayer({
            id: 'points',
            type: 'symbol',
            source: {
              type: 'geojson',
              data: {
                type: 'FeatureCollection',
                features: [
                  {
                    type: 'Feature',
                    geometry: {
                      type: 'Point',
                      coordinates: [lng, lat]
                    },
                    properties: {
                      title: slug, //'DevWorks',
                      icon: 'college'
                    }
                  },
                  {
                    type: 'Feature',
                    geometry: {
                      type: 'Point',
                      coordinates: [-122.414, 37.776]
                    },
                    properties: {
                      title: 'Mapbox SF',
                      icon: 'harbor'
                    }
                  }
                ]
              }
            },
            layout: {
              'icon-image': '{icon}-15',
              'text-field': '{title}',
              'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
              'text-offset': [0, 0.6],
              'text-anchor': 'top'
            }
          });
        });

        // Add zoom and rotation controls to the map.
        map.addControl(new mapboxgl.NavigationControl());
      }
    });
    this.isLoading = false;
  }
}
