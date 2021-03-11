import {Directive, ElementRef, Input, Renderer2} from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[preloaderGif]'
})
export class PreloaderGifDirective {

  parentNode = this.renderer.parentNode(this.elemRef.nativeElement);
  cloneNode = this.elemRef.nativeElement.cloneNode();
  imgTag: HTMLImageElement = this.renderer.createElement('img');

  // FIXME доработать не забыть...
  @Input() set preloaderGif(isLoading: boolean) {
    if (isLoading) {
      this.elemRef.nativeElement.style.display = 'none';
      this.renderer.insertBefore(this.parentNode, this.cloneNode, this.elemRef.nativeElement);
      this.renderer.appendChild(this.cloneNode, this.imgTag);

      const heightCloneNode = this.cloneNode.getBoundingClientRect().height;

      // обнуляем padding, т.к. с паддингами высота ломается
      this.renderer.setStyle(this.cloneNode, 'padding-top', '0px');
      this.renderer.setStyle(this.cloneNode, 'padding-bottom', '0px');

      this.renderer.setAttribute(this.imgTag, 'src', '../../../assets/img/loader.gif');
      this.renderer.setStyle(this.imgTag, 'height', heightCloneNode + 'px');
      this.renderer.setStyle(this.imgTag, 'alt', 'Loading...');

    } else {
      this.renderer.removeChild(this.parentNode, this.cloneNode);
      this.elemRef.nativeElement.style.display = 'block';
    }
  }

  constructor(
    private elemRef: ElementRef,
    private renderer: Renderer2,
  ) {
  }

}
