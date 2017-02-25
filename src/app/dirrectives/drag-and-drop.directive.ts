import { Observable } from 'rxjs/Rx';
import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({ selector: '[appDragAndDrop]'})
export class DragAndDropDirective implements OnInit {
    private element = this.el.nativeElement;
    private mouseUp = Observable.fromEvent<MouseEvent>(this.element, 'mouseup')
        .map((e) => {
            if (this.element.offsetLeft > this.element.parentElement.offsetLeft - 30 &&
                (this.element.offsetLeft + this.element.offsetWidth) <
                (this.element.parentElement.offsetLeft + this.element.parentElement.offsetWidth + 30)) {
                 this.element.style.position = 'relative';
                this.element.style.top = 'inherit';
                this.element.style.left = 'inherit';
                 this.element.classList.remove('showContent');
            } else if (!this.element.classList.contains('showContent')) {
                this.element.className += ' showContent';
            }
            console.log('Mouse Up', this.el);
            console.log('Parent');            
        });

    private mouseDown = Observable.fromEvent<MouseEvent>(this.element, 'mousedown');
    private mouseMove = Observable.fromEvent<MouseEvent>(document, 'mousemove');

    constructor(private el: ElementRef) {
        el.nativeElement.style.backgroundColor = 'yellow';
    }

    ngOnInit() {
        let offsetY: number;
        let offsetX: number;

        this.mouseDown
            .flatMap((mouse) => {
                offsetX = mouse.offsetX;
                offsetY = mouse.offsetY;
                return this.mouseMove.takeUntil(this.mouseUp);
            })
            .map(mouse => {
                this.element.style.position = 'absolute';
                this.element.style.top = mouse.pageY - offsetY + 'px';
                this.element.style.left = mouse.pageX - offsetX + 'px';
                this.element.style.zIndex = '10';
            })
            .subscribe(
                m => {
                    console.log('mousemove');
                },
                err => console.log(err),
                () => {
                    console.log('done');
                }
            );
    }
}