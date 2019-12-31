import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upd-bootcamp',
  templateUrl: './upd-bootcamp.component.html',
  styleUrls: ['./upd-bootcamp.component.css']
})
export class UpdBootcampComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    localStorage.setItem('returnUrl', '/upd-bootcamp/000');
  }
}
