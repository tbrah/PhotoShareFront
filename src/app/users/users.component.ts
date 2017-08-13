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
        this.userService.getUsers()
        .subscribe(users => {
            this.users = users;
            console.log(this.users);
        });
  }

    
  ngOnInit() {
  }

}
