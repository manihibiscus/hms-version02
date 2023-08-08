import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appBillStyle]'
})
export class BillStyleDirective {

  constructor(private elRef:ElementRef) {
    elRef.nativeElement.style.color="green"
   }

}
