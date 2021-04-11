import {
  AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit,
  Attribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, DoCheck,
  EventEmitter,
  Input, OnChanges,
  OnDestroy,
  OnInit, Optional,
  Output, Self, SkipSelf
} from '@angular/core';
import {Course} from '../../model/course';
import {CoursesService} from '../courses.service';



@Component({
    selector: 'course-card',
    templateUrl: './course-card.component.html',
    styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent implements  OnInit {

    @Input()
    course: Course;

    @Input()
    cardIndex: number;

    @Output('courseChanged')
    courseEmitter = new EventEmitter<Course>();




    constructor(@Optional() private coursesService: CoursesService,
                // if by some reason you are requesting a dependency and it is not available, it will flag an error
                // However, by marking this with optional(), this means that this dependency is not mandatory to be injected
                // and your application will still run.
                // If we are not sure if the service will not be provided, that way we can mark it as optional and then handle
                // programmatically the cases if the service is undefined.

                // it happens when the dependency is not tree-shakeable

                @SkipSelf() private coursesService2: CoursesService,
                // marking this dependency with @SkipSelf() means that there is not a private copy of this service in this component
                // and should come for sure from its parent component.
                // this also overrides the Dependency Injection Hierarchical system in a way that it does not search or ignore
                // the service in the providers property even if you declare one for this service.


                @Attribute('type') private type: string) {


    }

    ngOnInit() {


    }



    onTitleChanged(newTitle: string) {

        this.course.description = newTitle;

    }


    onSaveClicked(description: string) {

        this.courseEmitter.emit({...this.course, description});

    }


}
