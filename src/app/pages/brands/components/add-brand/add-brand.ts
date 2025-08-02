import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { iBrand } from '../../../../interfaces/iBrand';
import { ICategory } from '../../../../interfaces/ICategory';
import { BrandService } from '../../../../Services/brand.service';
import { CategoryService } from '../../../../Services/category-service';
import { Auth } from '../../../../Services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-brand',
  imports: [FormsModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './add-brand.html',
  styleUrl: './add-brand.scss',
})
export class AddBrand implements OnInit {
  brandForm!: FormGroup;
  Brand!: iBrand;
  Categories!: ICategory[];
  selectedImageFile: File | null = null;

  _BrandService = inject(BrandService);
  _CategoryService = inject(CategoryService);
  _AuthService = inject(Auth);
  private router = inject(Router);

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.brandForm = this.fb.group({
      Name: ['', Validators.required],
      Description: [''],
      Address: [''],
      ImageFile: [null],
      CategoryID: ['', Validators.required],
      OwnerID: ['', Validators.required],
    });

    this.brandForm.patchValue({
      OwnerID: this._AuthService.getCurrentUserID() as string,
    });

    this.GetCategories();
  }

  onCancel(): void {
    this.router.navigate(['/brands']);
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedImageFile = file;
      this.brandForm.patchValue({ ImageFile: file });
      this.brandForm.get('ImageFile')?.updateValueAndValidity();
    }
  }

  GetCategories(): void {
    this._CategoryService.GetCategories().subscribe({
      next: (res) => {
        console.log('Categories fetched successfully', res);
        this.Categories = res as ICategory[];
      },
      error: (err) => {
        console.error('Error fetching categories', err);
      },
    });
  }

  onSubmit(): void {
    if (this.brandForm.invalid) {
      console.log('Form invalid');
      return;
    }
    const formData = new FormData();
    formData.append('Name', this.brandForm.value.Name);
    formData.append('Description', this.brandForm.value.Description || '');
    formData.append('Address', this.brandForm.value.Address || '');
    formData.append('CategoryID', this.brandForm.value.CategoryID.toString());
    formData.append('OwnerID', this.brandForm.value.OwnerID);
    if (this.selectedImageFile) {
      formData.append('ImageFile', this.selectedImageFile);
    }
    this._BrandService.CreateBrand(formData).subscribe({
      next: (res) => {
        console.log('Brand created successfully', res);
        this.router.navigate(['/brands']);
      },
      error: (err) => {
        console.error('Error creating brand', err);
      },
    });
  }
}
