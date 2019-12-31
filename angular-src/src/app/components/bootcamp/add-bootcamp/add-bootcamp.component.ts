import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-bootcamp',
  templateUrl: './add-bootcamp.component.html',
  styleUrls: ['./add-bootcamp.component.css']
})
export class AddBootcampComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    localStorage.setItem('returnUrl', '/add-bootcamp');
  }
}
