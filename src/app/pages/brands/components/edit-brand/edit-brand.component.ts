import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from '@services/brand.service'; 
import { CategoryService } from '@services/category-service'; 
import { Auth } from '@services/auth'; 
import { ICategory } from '@interfaces/ICategory'; 
import { IBrand } from '@interfaces/IBrand'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-brand',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './edit-brand.component.html',
  styleUrls: ['./edit-brand.component.scss'],
})
export class EditBrandComponent implements OnInit {
  brandForm!: FormGroup;
  Categories: ICategory[] = [];
  brandId!: number;
  selectedImageFile: File | null = null;
  selectedProfileImageFile: File | null = null;
  private _BrandService = inject(BrandService);
  private _CategoryService = inject(CategoryService);
  private _AuthService = inject(Auth);
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.brandForm = this.fb.group({
      Id: [''],
      Name: ['', Validators.required],
      Description: [''],
      Address: [''],
      ImageFile: [null],
      profileImage: [null],
      CategoryID: ['', Validators.required],
      OwnerID: ['', Validators.required],
    });

    this.brandForm.patchValue({
      OwnerID: this._AuthService.getCurrentUserID() as string,
    });

    this.loadCategories();

    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      this.brandId = Number(param);
      this.loadBrand(this.brandId);
    }
  }

  onCancel(): void {
    this.router.navigate(['/brands']);
  }

  loadCategories(): void {
    this._CategoryService.GetCategories().subscribe({
      next: (res) => {
        this.Categories = res as ICategory[];
      },
      error: (err) => {
        console.error('Error fetching categories', err);
      },
    });
  }

  loadBrand(id: number): void {
    this._BrandService.GetBrandById(id).subscribe({
      next: (brand: IBrand) => {
        this.brandForm.patchValue({
          Id: brand.id,
          Name: brand.name,
          Description: brand.description,
          Address: brand.address,
          CategoryID: brand.categoryID,
        });
      },
      error: (err) => {
        console.error('Error loading brand', err);
      },
    });
  }

  onImageCoverSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedImageFile = file;
      this.brandForm.patchValue({ ImageFile: file });
      this.brandForm.get('ImageFile')?.updateValueAndValidity();
    }
  }
  onImageProfileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedProfileImageFile = file;
      this.brandForm.patchValue({ profileImage: file });
      this.brandForm.get('profileImage')?.updateValueAndValidity();
    }
  }

  onSubmit(): void {
    if (this.brandForm.invalid) {
      console.log('Form invalid');
      return;
    }
    const formData = new FormData();
    formData.append('Id', this.brandForm.value.Id);
    formData.append('Name', this.brandForm.value.Name);
    formData.append('Description', this.brandForm.value.Description || '');
    formData.append('Address', this.brandForm.value.Address || '');
    formData.append('CategoryID', this.brandForm.value.CategoryID.toString());
    formData.append('OwnerID', this.brandForm.value.OwnerID);
    if (this.selectedImageFile) {
      formData.append('ImageFile', this.selectedImageFile);
    }
    if (this.selectedProfileImageFile) {
      formData.append('ProfileImage', this.selectedProfileImageFile);
    }
    this._BrandService.updateBrand(formData).subscribe({
      next: (res) => {
        alert('Brand updated successfully!');
        // console.log('Brand created successfully', res);
        this.router.navigate(['/brands']);
      },
      error: (err) => {
        console.error('Error creating brand', err);
      },
    });
  }
}