import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[ngxUnless]'
})
export class NgxUnlessDirective {
  // they are applied on top of a template.
  // they are going to decide when is the template gonna be instantiated.
  // Key features of a Structural directive is the ability to instantiate a template.

  visible = false;


  constructor(private templateRef: TemplateRef<any>,
              // first, we need a programmatic reference of our template.
              // with this variable, we are going to be able to instantiate a template somewhere on this directive.

              private viewContainer: ViewContainerRef
              // second, a mechanism for instantiating the template
              // a variable that lets us instantiate a template
  ) {

  }

  @Input()
  set ngxUnless(condition: boolean) {
    // third, a reference to the condition being applied to our directive
    // it should be the exact same name of the directive
    if (!condition && !this.visible) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      // takes a template reference.
      // this is the call that we are going to be doing to our viewContainer to instantiate the template on demand.

      this.visible = true;
    } else if (condition && this.visible) {
      this.viewContainer.clear();
      this.visible = false;
    }
  }
  // this receives the expression or condition passed to the ngxUnless property

}


// create directives command
// ng g directive directives/ngx-unless
// ngx prefix is commonly used in order to identify a directive that is not part of the Angular core
// or extended or extra directive
