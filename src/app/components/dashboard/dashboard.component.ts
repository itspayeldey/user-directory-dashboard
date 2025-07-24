import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../user.model';
import { UserService } from '../../myservices/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [FormsModule,CommonModule]
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
      let aValue: string | number = '';
      let bValue: string | number = '';
      switch (property) {
        case 'id':
          aValue = a.id;
          bValue = b.id;
          break;
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        case 'username':
          aValue = a.username;
          bValue = b.username;
          break;
        case 'email':
          aValue = a.email;
          bValue = b.email;
          break;
        case 'phone':
          aValue = a.phone;
          bValue = b.phone;
          break;
        case 'website':
          aValue = a.website;
          bValue = b.website;
          break;
        case 'company':
          aValue = a.company?.name || '';
          bValue = b.company?.name || '';
          break;
        default:
          aValue = '';
          bValue = '';
      }
      if (aValue === bValue) return 0;
      if (this.sortDirection) {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
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
