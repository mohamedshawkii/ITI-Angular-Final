import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../../Services/category-service';
import { ICategory } from '../../../../interfaces/ICategory';

@Component({
  selector: 'app-brands-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brands-filter.component.html',
  styleUrls: ['./brands-filter.component.scss']
})
export class BrandsFilterComponent implements OnInit {
  ngOnInit(): void {
    this.getCategories();
  }
  categories: ICategory[] = [];
  @Output() categoryChange = new EventEmitter<string>();
  @Output() sortChange = new EventEmitter<string>();

  _CategoriesService = inject(CategoryService);

  onCategoryChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    // console.log('category changed to:', value);
    this.categoryChange.emit(value);
  }

  onSortChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    // console.log('Sort changed to:', value);
    this.sortChange.emit(value);
  }

  getCategories(): void {
    this._CategoriesService.GetCategories().subscribe({
      next: (res) => {
        this.categories = res;
        // console.log('Categories fetched successfully', res);
      },
      error: (err) => {
        console.error('Error fetching categories', err);
      },
    });
  }
}
