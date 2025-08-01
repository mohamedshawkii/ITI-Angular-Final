import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from '../../../../Services/brand.service';
import { CategoryService } from '../../../../Services/category-service';
import { Auth } from '../../../../Services/auth';
import { ICategory } from '../../../../interfaces/ICategory';
import { iBrand } from '../../../../interfaces/ibrand';

@Component({
  selector: 'app-edit-brand',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './edit-brand.component.html',
  styleUrls: ['./edit-brand.component.scss'],
})
export class EditBrandComponent implements OnInit {
  brandForm!: FormGroup;
  Categories: ICategory[] = [];
  brandId!: number;
  selectedImageFile: File | null = null;

  private _BrandService = inject(BrandService);
  private _CategoryService = inject(CategoryService);
  private _AuthService = inject(Auth);
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.brandForm = this.fb.group({
      Id: [''],
      OwnerID: [''],
      Name: ['', Validators.required],
      Description: [''],
      Address: [''],
      CategoryID: ['', Validators.required],
      ImageFile: [null], // ده مش مربوط بinput، هنحط فيه الفايل يدوي
    });

    // نجيب الـ owner من التوكن
    const ownerId = this._AuthService.getCurrentUserID();
    if (ownerId) {
      this.brandForm.patchValue({ OwnerID: ownerId });
    }

    this.loadCategories();

    // نجيب الـ id من الـ route ونعبي البيانات
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
      next: (brand: iBrand) => {
        this.brandForm.patchValue({
          Name: brand.name,
          Description: brand.description,
          Address: brand.address,
          CategoryID: brand.categoryID,
          Id: brand.id,
          // OwnerID ما نغيروش لأن هو من التوكن
        });
      },
      error: (err) => {
        console.error('Error loading brand', err);
      },
    });
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedImageFile = file;
      this.brandForm.patchValue({ ImageFile: file });
      this.brandForm.get('ImageFile')?.updateValueAndValidity();
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

    this._BrandService.updateBrand(formData).subscribe({
      next: () => {
        alert('Brand Updated successfully');
        this.router.navigate(['/brands']);
      },
      error: (err) => {
        console.error('Error updating brand', err);
      },
    });
  }
}
//   if (this.selectedImageFile) {
//     formData.append('ImageFile', this.selectedImageFile);
//   }

//   this.service.updateBrand(formData).subscribe(
//     res => {
//       console.log('Brand updated successfully', res);
//     },
//     err => {
//       console.error('Update failed', err);
//     }
//   );
// }}
