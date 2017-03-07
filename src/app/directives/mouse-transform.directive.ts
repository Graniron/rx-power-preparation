import { Directive, ElementRef, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Directive({selector: '[appMouseTransform]'})
export class AppMouseTransformDirective implements OnInit {
    private element = this.el.nativeElement;
    private mouseDown$ = Observable.fromEvent<MouseEvent>(this.element, 'mousedown');
    private mouseUp$ = Observable.fromEvent<MouseEvent>(document, 'mouseup');
    
    private mouseMove$ = Observable.fromEvent<MouseEvent>(document, 'mousemove')
        .map(event => {
            return {x: event.clientX, y: event.clientY };
        })
        .takeUntil(this.mouseUp$);
    constructor(private el: ElementRef) {}

    ngOnInit() {
        this.mouseDown$.switchMap((mouseEvent) => this.mouseMove$)

        .subscribe(
            (pos) => {
                const rotY = (pos.x / document.documentElement.clientWidth * 300) - 150;

                this.element.style = `transform: rotateY(${rotY}deg);`;
            }
        )
    }
}