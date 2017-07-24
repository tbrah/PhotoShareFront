import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

	users: User[];

  constructor(private userService: UserService) { 
        this.userService.getAccessToken()
            .subscribe(data => {
                this.getUsers(data.access_token)
            });
  }
    
    getUsers(accessToken: string) {
        //Returns the get data from the method in userService.
        this.userService.getUsers(accessToken)
            .subscribe(
                users => {
                    this.users = users;
                });
    }
    
  ngOnInit() {
  }

}
