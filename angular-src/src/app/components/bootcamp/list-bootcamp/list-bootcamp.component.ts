import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-list-bootcamp',
  templateUrl: './list-bootcamp.component.html',
  styleUrls: ['./list-bootcamp.component.css']
})
export class ListBootcampComponent implements OnInit {
  style = 'mapbox://styles/mapbox/streets-v11';
  lng = -71.104028;
  lat = 42.350846;

  constructor() {}

  ngOnInit() {
    localStorage.setItem('returnUrl', '/list-bootcamp/000');
    let mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
    mapboxgl.accessToken = environment.mapbox.accessToken;
    let map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 7,
      center: [-71.104028, 42.350846]
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
                  coordinates: [-71.104028, 42.350846]
                },
                properties: {
                  title: 'DevWorks',
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
}
