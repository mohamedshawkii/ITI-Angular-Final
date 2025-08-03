import { Component, inject } from '@angular/core';
import { UserManagementServic } from '../../../../Services/user-management-servic';
import { IUser } from '../../../../interfaces/IUser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  imports: [CommonModule],
  templateUrl: './users.html',
  styleUrl: './users.scss'
})

export class Users {
  users: IUser[] = [];
  displayedUsers: IUser[] = [];
  filteredUsers: IUser[] = [];
  pageSize = 5;
  currentPage = 1;
  totalPages = 0;
  totalPagesArray: number[] = [];

  // Search functionality
  searchQuery: string = '';

  _UserManagement = inject(UserManagementServic)

  ngOnInit(): void {
    this.GetAll();
  }

  GetAll(): void {
    this._UserManagement.GetAll().subscribe({
      next: (value) => {
        this.displayedUsers = value;
        this.users = this.displayedUsers;

        this.totalPages = Math.ceil(this.users.length / this.pageSize);
        this.totalPagesArray = Array(this.totalPages)
          .fill(0)
          .map((_, i) => i + 1);
        this.updateDisplayedUsers();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  hasAnyRole(rolesToCheck: string[], userRoles: string[]): boolean {
    return rolesToCheck.some(role => userRoles.includes(role));
  }

  Promotion(userId: string): void {
    this._UserManagement.Promotion(userId).subscribe({
      next: (value) => {
        this.GetAll();
      },
      error: (err) => {
        console.error('error', err);
      }
    });
  }
  Demote(userId: string): void {
    this._UserManagement.Demotion(userId).subscribe({
      next: (value) => {
        console.log('DemoteToUser', value);
        this.GetAll();
      },
      error: (err) => {
        console.error('error', err);
      }
    });
  }

  calculatePagination(): void {
    this.totalPages = Math.ceil(this.filteredUsers.length / this.pageSize);
    this.totalPagesArray = Array(this.totalPages)
      .fill(0)
      .map((_, i) => i + 1);
    if (this.currentPage > this.totalPages) {
      this.currentPage = 1;
    }
  }

  updateDisplayedUsers(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.displayedUsers = this.users.slice(start, end);
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updateDisplayedUsers();
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedUsers();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedUsers();
    }
  }

  /**
   * Handle filter button click
   */
  onFilter(): void {
    console.log('Filter clicked');
    // Implement filter logic here
  }

  /**
   * Handle add user button click
   */
  onAddUser(): void {
    console.log('Add user clicked');
    // Implement add user logic here
  }
}
