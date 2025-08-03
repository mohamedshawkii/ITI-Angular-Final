import { Component, inject } from '@angular/core';
import { UserManagementServic } from '../../../../Services/user-management-servic';
import { IUser } from '../../../../interfaces/IUser';
import { AddDeliveryBoyComponent } from '../add-delivery-boy/add-delivery-boy';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  imports: [AddDeliveryBoyComponent,CommonModule],
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
  
  // متغير للتحكم في عرض الفورم
  showAddForm = false;

  // دالة لفتح الفورم
  openAddForm(): void {
        console.log('تم الضغط على الزر! قيمة showAddForm قبل التغيير:', this.showAddForm);

    this.showAddForm = true;
  }

  // دالة لإغلاق الفورم
  closeAddForm(): void {
    this.showAddForm = false;
    // يمكنك عمل إعادة تحميل للبيانات هنا إذا أردت
    // this.loadUsers(); 
  }

  // Search functionality
  searchQuery: string = '';

  _UserManagement = inject(UserManagementServic)

  ngOnInit(): void {
    this.GetAll();
  }

  GetAll(): void {
    this._UserManagement.GetAll().subscribe({
      next: (value) => {
        this.users = value;
        this.filteredUsers = [...this.users]; // Initialize filtered users
        this.calculatePagination();
        this.updateDisplayedUsers();
        console.log(value);
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

  /**
   * Calculate pagination based on filtered users
   */
  calculatePagination(): void {
    this.totalPages = Math.ceil(this.filteredUsers.length / this.pageSize);
    this.totalPagesArray = Array(this.totalPages)
      .fill(0)
      .map((_, i) => i + 1);
    
    // Reset to first page if current page exceeds total pages
    if (this.currentPage > this.totalPages) {
      this.currentPage = 1;
    }
  }

  updateDisplayedUsers(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.displayedUsers = this.filteredUsers.slice(start, end);
  }

  /**
   * Filter users based on search query
   */
  onSearch(): void {
    if (!this.searchQuery.trim()) {
      this.filteredUsers = [...this.users];
    } else {
      const query = this.searchQuery.toLowerCase().trim();
      this.filteredUsers = this.users.filter(user => 
        (user.firstName?.toLowerCase().includes(query)) ||
        (user.lastName?.toLowerCase().includes(query)) ||
        (user.email?.toLowerCase().includes(query)) ||
        (user.roles?.[0]?.toLowerCase().includes(query))
      );
    }
    
    this.currentPage = 1; // Reset to first page
    this.calculatePagination();
    this.updateDisplayedUsers();
  }

  /**
   * Clear search and show all users
   */
  clearSearch(): void {
    this.searchQuery = '';
    this.onSearch();
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
