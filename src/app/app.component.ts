import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  Inject,
  Injector,
  OnInit,
  Optional,
  Self,
  SkipSelf
} from '@angular/core';
import {Course} from './model/course';
import {Observable} from 'rxjs';
import {APP_CONFIG, AppConfig, CONFIG_TOKEN} from './config';
import {COURSES} from '../db-data';
import {CoursesService} from './courses/courses.service';
import {createCustomElement} from '@angular/elements';
import {CourseTitleComponent} from './course-title/course-title.component';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [
      CoursesService,
      // creating multiple copy of our service using the providers property
    ]
})
export class AppComponent implements OnInit {

    courses: Course[] = COURSES;

    coursesTotal = this.courses.length;

    constructor(
        @Optional()private coursesService: CoursesService,
        // marking this dependency as @Optional() means that it is not mandatory to be injected

        @Self()private coursesService2: CoursesService,
        // marking this dependency with @Self() means that this local copy is private to this component only and is not
        // injected from somewhere else. So if this mark exist it can only come from the component itself.
        // the dependency created here is still shared to its children.
        // This also overrides the Dependency Injection Hierarchical system

        @Inject(CONFIG_TOKEN) private config: AppConfig,
        // injecting here our global configuration object
        // Dependency Injection system needs to know what token to associate to this AppConfig type that is because on the providers (above)
        // we declare the token as type CONFIG_TOKEN.
        // AppConfig is an object type and not a Typescript class like all other services, we can not use it as a dependency injection token
        // AppConfig is an interface type and cannot be use as a unique key of a given injectable on our Dependency Injection system, that
        // is because the interface does not exist at run time, on compile time construct only - it is when Typescript codes are converted
        // into Javascript codes

        // the Inject() decorator is useful in this case where we cannot use a class as a Dependency Injection token,
        // so we need to declare them manually using it.

        private injector: Injector) {

    }

    ngOnInit() {

        const htmlElement = createCustomElement(CourseTitleComponent, {injector: this.injector});

        customElements.define('course-title', htmlElement);

    }

    onEditCourse() {

            this.courses[1].category = 'ADVANCED';

    }

    save(course: Course) {
        this.coursesService.saveCourse(course)
            .subscribe(
                () => console.log('Course Saved!')
            );
    }


}
