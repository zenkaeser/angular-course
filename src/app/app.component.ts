import {Component, OnInit } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Course} from './model/course';
import {CoursesService} from './services/courses.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // in order to instantiate the Application Component Class,
  // Angular is going to invoke the constructor and pass the multiple dependencies
  // once it is done, Angular will then call ngOnInit() method.

  courses$: Observable<Course[]>;
  // annotate the variable with a $ sign to signify that it is an observable


  constructor(
    private http: HttpClient,
    // an angular built in service, Http service that is used to fetch data from the backend
    // inject it in the class via the constructor.
    // declaring a reference to the service and Angular will know when it instantiates this class
    // that it needs to provide this dependency.

    private coursesService: CoursesService,
    // DEPENDENCY INJECTION
    // the class does not create its own dependency such as the HttpClient rather it will be provided via the constructor
    // this class depends on HttpClient because it needs internally in order to perform some of its functions
    // so, the class will not create its dependencies it gets them injected to it via the constructor, this is Dependency Injection
  ) {

  }

  ngOnInit() {
    // the best place to put some initialization logic such as triggering an HTTP backend call
    // that is going to fetch the data that this component needs.
    // a lifecycle hook that will be called by the Angular framework itself and not by us.

    const params = new HttpParams()
      .set('page', '1')
      .set('pageSize', '10');
    // adding get parameters.
    // this class has an immutability based api, if we want to change the parameters being passed (currently none)
    // we need to call the set method.

    this.courses$ = this.http.get<Course[]>('/api/courses', {params});
    // assign the http get request to an observable so that  you can access it on the template using async pipe
  }



}
