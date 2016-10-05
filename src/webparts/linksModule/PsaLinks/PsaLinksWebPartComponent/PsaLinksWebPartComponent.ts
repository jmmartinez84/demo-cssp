import { Component, ElementRef, Inject, Output } from '@angular/core';
@Component({
  selector: 'psa-links-webpart',
  templateUrl: '$BASEURL$PsaLinks/PsaLinksWebPartComponent/PsaLinksWebPartComponent.html'
})
export class PsaLinksWebPartComponent {
  elementRef:ElementRef;
  serverUrl:string;
  constructor(@Inject(ElementRef) _elementRef:ElementRef){
    this.elementRef = _elementRef;
    let native = this.elementRef.nativeElement;
    this.serverUrl = native.getAttribute("data-url");

  }
 }
