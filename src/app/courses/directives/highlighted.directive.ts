import {Directive, EventEmitter, Host, HostBinding, HostListener, Input, Output} from '@angular/core';
import {CoursesService} from '../courses.service';


@Directive({
    selector: '[highlighted]',
    exportAs: 'hl'
})
export class HighlightedDirective {

    @Input('highlighted')
    isHighlighted = false;

    @Output()
    toggleHighlight = new EventEmitter();

    constructor(
      private coursesService: CoursesService,
      // this service is getting the instance created from the parent component
      // only one instance is created and shared across.

      @Host() private coursesService2: CoursesService,
      // by marking this with @Host() this means that this service is taken from the instance
      // that was created by its host element and not somewhere else.
      // this directive will also get its own private instance of the service that was created by the host element.
      // So, if the element was created 10 times, it will also generate 10 instances.
) {

        console.log('coursesService highlighted ' + coursesService.id);

    }

    @HostBinding('class.highlighted')
    get cssClasses() {
        return this.isHighlighted;
    }

    @HostListener('mouseover', ['$event'])
    mouseOver($event) {

        console.log($event);

        this.isHighlighted = true;
        this.toggleHighlight.emit(this.isHighlighted);
    }

    @HostListener('mouseleave')
    mouseLeave() {
        this.isHighlighted = false;
        this.toggleHighlight.emit(this.isHighlighted);
    }

    toggle() {
        this.isHighlighted = !this.isHighlighted;
        this.toggleHighlight.emit(this.isHighlighted);
    }



}
