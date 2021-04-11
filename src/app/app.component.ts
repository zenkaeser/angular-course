import {ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, Inject, Injector, OnInit} from '@angular/core';
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
    providers: [{
      // adding our token to the dependency injection system

      provide: CONFIG_TOKEN,
      // means that we are providing this token

      useFactory: () => APP_CONFIG,
      // providing the value that is getting injected
      // we can use useFactory method in order to create a function that would returns the value of the config value immediately
      // simply returns the value of our config object

      useValue: APP_CONFIG
      // another property that we can use to pass value. This ig going to be the value injected whenever this token gets requested.
    }]
    // this provider here is not tree-shakeable, this means that if we remove the dependency in this application on the constructor and we
    // reload the application, this configuration token is still added to the application bundle.
    // check it using Chrome Dev tools and go to Sources tab, find CONFIG_TOKEN.

    // To make it tree-shakeable, remove the providers property of this component and add it on the config.ts file instead.
})
export class AppComponent implements OnInit {

    courses: Course[] = COURSES;

    coursesTotal = this.courses.length;

    constructor(
        private coursesService: CoursesService,
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
