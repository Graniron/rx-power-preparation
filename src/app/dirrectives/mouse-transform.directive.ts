import { Directive, ElementRef, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Directive({selector: '[appMouseTransform]'})
export class AppMouseTransformDirective implements OnInit {
    private element = this.el.nativeElement;
    private mouseMove$ = Observable.fromEvent<MouseEvent>(this.element, 'mousemove')
        .map(event => {
            return {x: event.clientX, y: event.clientY };
        });
    constructor(private el: ElementRef) {}

    ngOnInit() {
        this.mouseMove$.subscribe(
            (pos) => {
                const rotX = (pos.y / document.documentElement.clientHeight * -50) - 25;
                const rotY = (pos.x / document.documentElement.clientWidth * 50) - 25;

                this.element.style = `transform: rotateX(${rotX}deg) rotateY(${rotY}deg);`;
            }
        )
    }
}