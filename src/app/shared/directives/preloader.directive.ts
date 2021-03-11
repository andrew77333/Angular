import {Directive, ElementRef, Input, Renderer2} from '@angular/core';
import {timer} from 'rxjs';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[preloader]'
})
export class PreloaderDirective {

  parentN = this.renderer.parentNode(this.elemRef.nativeElement);
  childN = this.elemRef.nativeElement.cloneNode();
  timerForAddingDot: any;

  @Input() set preloader(isLoading: boolean) {
    let count = 0;
    if (isLoading) {
      this.elemRef.nativeElement.style.display = 'none';
      this.renderer.insertBefore(this.parentN, this.childN, this.elemRef.nativeElement);
      this.timerForAddingDot = timer(0, 1000).subscribe(() => {
        if (count > 5) count = 0;
        this.childN.innerHTML = 'Loading' + '.'.repeat(count++);
      });
    } else {
      this.renderer.removeChild(this.parentN, this.childN);
      this.elemRef.nativeElement.style.display = 'block';
      if (this.timerForAddingDot) this.timerForAddingDot.unsubscribe();
    }
  }

  constructor(
    private elemRef: ElementRef,
    private renderer: Renderer2,
  ) {
  }

}
