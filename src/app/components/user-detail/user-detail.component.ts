import { Component, OnInit } from '@angular/core';
import { User } from '../../user.model';
import { UserService } from '../../myservices/user.service';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: User | undefined;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    const userId = 1; // Replace with actual user ID
    this.userService.getUserById(userId).subscribe(user => {
      this.user = user;
    });
  }
}
