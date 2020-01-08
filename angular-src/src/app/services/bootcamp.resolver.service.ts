import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of, empty } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { BootcampsService } from './bootcamps.service';

@Injectable()
// Implement the Resolve interface, as we are implementing a route resolve guard
// Resolve interface supports generics, so specify the type of data that this
// resolver returns using the generic parameter
export class BootcampResolverService implements Resolve<any | string> {
  // Inject the employeee service as we need it to retrieve employee data
  constructor(private bootcampsService: BootcampsService) {}
  // Resolve interface contains the following one method for which we need to
  // provide implementation. This method calls EmployeeService & returns employee data
  resolve(route: ActivatedRouteSnapshot): Observable<any | string> {
    console.log(
      `ReviewResolverService route.paramMap.get('bootcampId') ${route.paramMap.get(
        'bootcampId'
      )}`
    );
    // localStorage.setItem(
    //   'returnUrl',
    //   `/reviews/${route.paramMap.get('bootcampId')}`
    // );
    return this.bootcampsService
      .getBootcamp(route.paramMap.get('bootcampId'))
      .pipe(catchError((err: string) => of(err)));
    // .pipe(
    //   catchError(() => {
    //     return empty();
    //   })
    // );
  }
}
