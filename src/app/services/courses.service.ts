import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
  // this property here means that we should create an instance of this service and only one instance
  // and, have it available at the root of the dependency injection
  // this means that there will only be one instance available for the whole application
  // this type of service is known as Application singleton - only one instance
})
// Injectable decorator means that this service is injectable in our component just like the HttpClient (Angular's built in service)
export class CoursesService {

  constructor() { }
}


// create a service command
// ng g service services/courses
