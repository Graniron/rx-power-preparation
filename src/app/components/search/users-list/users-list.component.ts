import { Observable } from 'rxjs/Rx';
import { UsersService } from './../../../services/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  private users;
  private count: number = 0;
  private mouseUp = Observable.fromEvent<MouseEvent>(document, 'mouseup');
  private allowedWith = window.innerWidth * 0.8;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    console.log(window.innerWidth);
    this.usersService.onUsersUpdate.subscribe(
      (results) => {
        this.count = results.total_count;
        this.users = results.items;
      }
    )
  }

  onMouseDown(e) {
    console.log(11, e, e.target.nodeName);
    let element = e.target.nodeName == 'LI' ? e.target : e.target.parentNode;

    Observable.fromEvent<MouseEvent>(document, 'mousemove')
      .map(mouse => {
        element.style.top = mouse.clientY + 'px';
        element.style.left = mouse.clientX + 'px';
        element.style.zIndex = '10';
        element.style.position = 'absolute';
        
      })      
      .takeUntil(this.mouseUp)
      .subscribe(
        mouse => {
          console.log(window.innerWidth);
        },
        err => console.error(err),
        () => {
          if (!element.style.left || parseInt(element.style.left, 10) > this.allowedWith) {
            console.log(1);
            element.style.position = 'relative';
            element.style.top = 'inherit';
            element.style.left = 'inherit';
            element.classList.remove('showContent');
          } else if (!element.classList.contains('showContent')) {
            console.log(2, element.style.left, this.allowedWith);
            
            element.className += ' showContent';
          }
          console.log(element.style.left, this.allowedWith, 'done');
        });
  }

}
