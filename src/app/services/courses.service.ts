import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Course} from '../model/course';

@Injectable({
  providedIn: 'root'
  // this property here means that we should create an instance of this service and only one instance
  // and, have it available at the root of the dependency injection
  // this means that there will only be one instance available for the whole application
  // this type of service is known as Application singleton - only one instance
})
// Injectable decorator means that this service is injectable in our component just like the HttpClient (Angular's built in service)
export class CoursesService {
  constructor(private http: HttpClient) {
  }

  loadCourses(): Observable<Course[]> {
    const params = new HttpParams()
      .set('page', '1')
      .set('pageSize', '10');
    // adding get parameters
    // this class has an immutability based api, if we want to change the parameters being passed (currently none)
    // we need to call the set method

    return this.http.get<Course[]>('/api/courses', {params});
  }

  saveCourse(course: Course) {
    const headers = new HttpHeaders()
      .set('X-Auth', 'userId');
    // a custom http header say you want to add an authentication header that identifies the user
    // so that the server can know if the operation is allowed or not.

    return this.http.put(`api/courses/${course.id}`, course, {headers})
      .subscribe(() => console.log('Courses saved'));
  }

}

// create a service command
// ng g service services/courses
