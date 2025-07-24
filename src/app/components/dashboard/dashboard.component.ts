import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../user.model';
import { UserService } from '../../myservices/user.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class DashboardComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm: string = '';
  sortDirection: boolean = true; // true for ascending

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      this.filteredUsers = users; // Initialize filtered users
    });
  }

  filterUsers() {
    this.filteredUsers = this.users.filter(user => 
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
      user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onSearchChange(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.filterUsers();
  }

  onSortChange(sortInfo: { property: string; direction: boolean }) {
    this.sortDirection = sortInfo.direction;
    this.sortUsers(sortInfo.property);
  }

  sortUsers(property: string) {
    this.filteredUsers.sort((a, b) => {
      if (this.sortDirection) {
        return a[property] > b[property] ? 1 : -1;
      } else {
        return a[property] < b[property] ? 1 : -1;
      }
    });
  }

  navigateToDetail(userId: number) {
    this.router.navigate(['/user', userId]);
  }

  // Define the trackById function
  trackById(index: number, user: User): number {
    return user.id; // Return the unique identifier for each user
  }
}
