import { Directive } from '@angular/core';

@Directive({
  selector: '[ngxUnless]'
})
export class NgxUnlessDirective {
  // they are applied on top of a template
  // they are going to decide when is the template gonna be instantiated

  constructor() { }

}


// create directives command
// ng g directive directives/ngx-unless
// ngx prefix is commonly used in order to identify a directive that is not part of the Angular core
// or extended or extra directive
