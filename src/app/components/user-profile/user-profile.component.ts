import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export interface USER {
  login: string;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  private userId: number;
  private user: USER;

  constructor(private activatedRoute: ActivatedRoute,
              private usersService: UsersService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params) => {
        this.userId = params['id'];
        this.getUserInfo();
      }
    )
  }

  getUserInfo() {
    this.usersService.getUser(this.userId).subscribe(
      (user) => {
        this.user = user;
      },
      (err) => console.error('Error: ', err)
    )
  }

}
