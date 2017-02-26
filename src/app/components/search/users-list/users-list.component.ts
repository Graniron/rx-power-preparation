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
    this.usersService.onUsersUpdate.subscribe(
      (results) => {
        this.count = results.total_count;
        this.users = results.items;

        this.users.map((user) => {
           user.orgs = this.getOrgs(user.login);
        });
        console.log(this.users);
      }
    )
  }

  getOrgs(username) {
    return this.usersService.getOrganisations(username);
  }

}
