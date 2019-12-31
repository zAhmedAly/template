import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-bootcamp',
  templateUrl: './list-bootcamp.component.html',
  styleUrls: ['./list-bootcamp.component.css']
})
export class ListBootcampComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    localStorage.setItem('returnUrl', '/list-bootcamp/000');
  }
}
