import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-bootcamp',
  templateUrl: './manage-bootcamp.component.html',
  styleUrls: ['./manage-bootcamp.component.css']
})
export class ManageBootcampComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    localStorage.setItem('returnUrl', '/manage-bootcamp/000');
  }
}
