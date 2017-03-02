import { Component, OnInit } from '@angular/core';

import { UsersService } from './../../../services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  private users;
  private count: number = 0;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    // Subscribe to Users Observable to listen for changes
    this.usersService.onUsersUpdate$.subscribe(
      (results: any) => {
        this.count = results.total_count;
        this.users = results.items;
      }
    )
  }
}
