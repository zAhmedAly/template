import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard } from './guards/auth.guard';
import { AuthInterceptor } from './services/auth-interceptor';
import { BootcampsComponent } from './components/bootcamps/bootcamps.component';
import { ListBootcampComponent } from './components/bootcamp/list-bootcamp/list-bootcamp.component';
import { AddBootcampComponent } from './components/bootcamp/add-bootcamp/add-bootcamp.component';
import { UpdBootcampComponent } from './components/bootcamp/upd-bootcamp/upd-bootcamp.component';
import { ManageBootcampComponent } from './components/bootcamp/manage-bootcamp/manage-bootcamp.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { AddReviewComponent } from './components/review/add-review/add-review.component';
import { UpdReviewComponent } from './components/review/upd-review/upd-review.component';
import { CoursesComponent } from './components/courses/courses.component';
import { AddCourseComponent } from './components/course/add-course/add-course.component';
import { UpdCourseComponent } from './components/course/upd-course/upd-course.component';
import { BootcampsService } from './services/bootcamps.service';
import { ReviewsService } from './services/reviews.service';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },

  { path: 'bootcamps', component: BootcampsComponent },
  { path: 'list-bootcamp/:bootcampId', component: ListBootcampComponent },

  {
    path: 'add-bootcamp',
    component: AddBootcampComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'upd-bootcamp/:bootcampId',
    component: UpdBootcampComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'manage-bootcamp/:bootcampId',
    component: ManageBootcampComponent,
    canActivate: [AuthGuard]
  },

  { path: 'reviews/:bootcampId', component: ReviewsComponent },
  {
    path: 'add-review/:bootcampId',
    component: AddReviewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'upd-review/:bootcampId',
    component: UpdReviewComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    BootcampsComponent,
    ListBootcampComponent,
    AddBootcampComponent,
    UpdBootcampComponent,
    ManageBootcampComponent,
    ReviewsComponent,
    AddReviewComponent,
    UpdReviewComponent,
    CoursesComponent,
    AddCourseComponent,
    UpdCourseComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot()
  ],
  providers: [
    ValidateService,
    AuthService,
    AuthGuard,
    BootcampsService,
    ReviewsService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
