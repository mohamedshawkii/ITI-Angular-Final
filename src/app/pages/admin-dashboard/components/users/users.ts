import { Component, inject } from '@angular/core';
import { UserManagementServic } from '../../../../Services/user-management-servic';
import { IUser } from '../../../../interfaces/IUser';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.html',
  styleUrl: './users.scss'
})

export class Users {
  users: IUser[] = [];
  displayedUsers: IUser[] = [];
  pageSize = 5;
  currentPage = 1;
  totalPages = 0;
  totalPagesArray: number[] = [];

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

  Promotion(userId: string): void {
    this._UserManagement.Promotion(userId).subscribe({
      next: (value) => {
        console.log('Promoted', value);
        this.GetAll();
      },
      error: (err) => {
        console.error('error', err);
      }
    });
  }

  updateDisplayedUsers(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.displayedUsers = this.displayedUsers.slice(start, end);
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
}
