import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { iBrand } from '../../../../interfaces/ibrand';
import { ICategory } from '../../../../interfaces/ICategory';
import { BrandService } from '../../../../Services/brand.service';
import { CategoryService } from '../../../../Services/category-service';

@Component({
  selector: 'app-add-brand',
  imports: [FormsModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './add-brand.html',
  styleUrl: './add-brand.scss'
})
export class AddBrand implements OnInit {
  brandForm!: FormGroup;
  Brand!: iBrand;
  Categories!: ICategory[];
  _BrandService = inject(BrandService);
  _CategoryService = inject(CategoryService);

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.brandForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      address: [''],
      image: [''],
      CategoryID: ['', Validators.required],
      OwnerID: ['', Validators.required]
    });
    this.brandForm.patchValue({ OwnerID: "dac65c6d-f848-4841-8e36-4fbda6220f5b" });
    this.GetCategories();
    console.log('CategoryID Selected:', this.brandForm.value.CategoryID);
  }

  GetCategories(): void {
    this._CategoryService.GetCategories().subscribe({
      next: (res) => {
        console.log('Categories fetched successfully', res);
        this.Categories = res as ICategory[];
      },
      error: (err) => {
        console.error('Error fetching categories', err);
      }
    })
  }

  OnSubmtit(): void {
    if (this.brandForm.valid) {
      console.log('Form Submitted', this.brandForm.value);
      this.Brand = this.brandForm.value as iBrand;

      this._BrandService.CreateBrand(this.Brand).subscribe({
        next: (res) => {
          console.log('Brand created successfully', res);
        },
        error: (err) => {
          console.error('Error creating brand', err);
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }


}
