import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Course} from '../model/course';

@Component({
    selector: 'course-card',
    templateUrl: './course-card.component.html',
    styleUrls: ['./course-card.component.css'],
    encapsulation:
      // ViewEncapsulation.Emulated,
        // default, uses special attributes added on the element, recommended

      // ViewEncapsulation.None
        // if you want to style your application with plain CSS, CSS modifier will not be used.
        // all styles will be bundled together into a one global stylesheet w/o further processing

      ViewEncapsulation.ShadowDom
        // built in browser mechanism for doing view encapsulation.
        // It does something similar to the emulated option that allows us to built styles that are specific to only
        // certain elements of the page
        // but, it does so natively directly using browser provided functionality. Instead of using special attributes for increasing
        // the specificity of the components styles.
        // all html of the host element is inside the 'shadow-root' - it is like a new browser document very similar to the page where we
        // are adding this component. And, inside it is a series of styles. The styles that are getting applied to our component
        // and they are only visible inside the shadow-root. These styles are not going to affect the rest of the page.
        // By definition the styles are confined in the interior of shadow-root which is a separate html document.
})
export class CourseCardComponent implements OnInit {

    @Input()
    course: Course;

    @Input()
    cardIndex: number;

    @Output('courseChanged')
    courseEmitter = new EventEmitter<Course>();


    constructor() {

    }

    ngOnInit() {

    }


    onSaveClicked(description:string) {

        this.courseEmitter.emit({...this.course, description});

    }




}
