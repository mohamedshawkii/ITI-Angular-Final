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
  selectedImageFile: File | null = null;

  _BrandService = inject(BrandService);
  _CategoryService = inject(CategoryService);

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.brandForm = this.fb.group({
      Name: ['', Validators.required],
      Description: [''],
      Address: [''],
      ImageFile: [''],
      CategoryID: ['', Validators.required],
      OwnerID: ['', Validators.required]
    });
    this.brandForm.patchValue({ OwnerID: "dac65c6d-f848-4841-8e36-4fbda6220f5b" });
    this.GetCategories();
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImageFile = file;
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
      }
    })
  }

  OnSubmtit(): void {
    if (this.brandForm.valid) {
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
