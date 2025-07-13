import { Component, inject } from '@angular/core';
import { UserManagementServic } from '../../../../Services/user-management-servic';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.html',
  styleUrl: './users.scss'
})
export class Users {
  _UserManagement = inject(UserManagementServic)
  users: any[] = [];
  displayedUsers: any[] = [];

  pageSize = 5;
  currentPage = 1;
  totalPages = 0;
  totalPagesArray: number[] = [];

  GetAll() {
    return this._UserManagement.GetAll().subscribe({
      next(value) {

      },
      error(err) {

      },
    });
  }



  ngOnInit(): void {
    // Sample user list
    this.users = Array.from({ length: 47 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@mail.com`
    }));

    this.totalPages = Math.ceil(this.users.length / this.pageSize);
    this.totalPagesArray = Array(this.totalPages)
      .fill(0)
      .map((_, i) => i + 1);

    this.updateDisplayedUsers();
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
}
