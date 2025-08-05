import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { IProduct } from '../../interfaces/IProduct';
import { BrandService } from '../../Services/brand.service';
import { ProductService } from '../../Services/product-service';
import { CartService } from '../../Services/cart-service';
import { environment } from '../../../environments/environments';
import { IReview } from '../../interfaces/IReview';
import { ReviewService } from '../../Services/review-service';
import { Auth } from '../../Services/auth';
import { iBrand } from '../../interfaces/iBrand';

@Component({
  selector: 'app-brand-detail',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './brand-detail.html',
  styleUrl: './brand-detail.scss'
})
export class BrandDetailComponent implements OnInit {
  currentUserId!: string;
  userRole!: string[];
  brand!: iBrand;
  products: IProduct[] = [];
  productForm!: FormGroup;
  BrandId!: number;
  cartItems!: IProduct[];
  selectedImageFile: File | null = null;
  EUrl = environment.apiUrl;
  selectedProduct: IProduct | null = null;
  newReview: IReview = {
    id: 0,
    userID: '',
    comment: '',
    rating: 1,
    createdAt: new Date(),
    productID: 0
  };
  showReviewForm = false;
  hasMoreProducts = false;
  showProductForm = false;
  ProductReviews: IReview[] = [];
  stars = [1, 2, 3, 4, 5];

  _AuthService = inject(Auth);
  _BrandService = inject(BrandService);
  _ProductService = inject(ProductService);
  _CartService = inject(CartService);
  _ReviewService = inject(ReviewService);
  _Router = inject(Router);

  constructor(private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      brandID: ['', Validators.required],
    });
    this.currentUserId = this._AuthService.getCurrentUserID()!;
    this.userRole = this._AuthService.getRole();

    this._CartService.cart$.subscribe(items => {
      this.cartItems = items;
    });

    const ParamId = this.route.snapshot.paramMap.get('id');
    if (ParamId) {
      this.BrandId = parseInt(ParamId);
      this.GetBrandById(this.BrandId);
      this.GetAllProducts(this.BrandId);
      this.GetProductReviews(this.BrandId);
    }
  }

  hasAnyRole(rolesToCheck: string[], userRoles: string[]): boolean {
    return rolesToCheck.some(role => userRoles.includes(role));
  }

  GetProductReviews(brandId: number) {
    this._ReviewService.BrandReviews(brandId).subscribe({
      next: (res) => {
        this.ProductReviews = res;
        // console.log('Product Reviews:', this.ProductReviews);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  editBrand(BrandId: number): void {
    if (BrandId !== null && BrandId !== undefined) {
      this._Router.navigateByUrl(`/edit-brand/${BrandId}`);
    }
  }

  editProduct(product: IProduct): void {
    this.selectedProduct = product;
    this.productForm.patchValue({
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      brandID: product.brandID
    });
    this.showProductForm = true;
  }

  closeReviewForm() {
    this.showReviewForm = false;

  }

  IsBrandOwner(): boolean {
    return !!this.brand?.ownerID && this.brand.ownerID === this.currentUserId;
  }

  openReviewForm() {
    this.showReviewForm = true;
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImageFile = file;
    }
  }

  SaveProduct() {
    if (!this.productForm.value.brandID && this.BrandId) {
      this.productForm.patchValue({ brandID: this.BrandId });
    }
    if (this.productForm.invalid) {
      console.log('Form is invalid', this.productForm.value);
      console.log('this.BrandId>>', this.BrandId);
      return;
    }

    const formData = new FormData();
    formData.append('name', this.productForm.value.name);
    formData.append('description', this.productForm.value.description);
    formData.append('price', this.productForm.value.price.toString());
    formData.append('quantity', this.productForm.value.quantity.toString());
    formData.append('brandID', this.productForm.value.brandID.toString());

    if (this.selectedImageFile) {
      formData.append('ImageFile', this.selectedImageFile);
    }

    if (this.selectedProduct?.id != null) {
      // EDIT MODE
      this._ProductService.UpdateProduct(this.selectedProduct.id, formData).subscribe({
        next: (res) => {
          const index = this.products.findIndex(p => p.id === this.selectedProduct!.id);
          if (index > -1) this.products[index] = res;

          this.closeProductForm();
          this.productForm.reset();
          this.selectedProduct = null;
        },
        error: (err) => console.error('Error updating product:', err)
      });
    } else {
      this._ProductService.CreateProduct(formData).subscribe({
        next: (res) => {
          this.products.push(res);
          this.closeProductForm();
          this.productForm.reset();
        },
        error: (err) => console.error('Error creating product:', err)
      });
    }
  }


  selectProduct(product: IProduct): void {
    this.selectedProduct = { ...product };
    this.productForm.patchValue({
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      brandID: product.brandID,
    });
    this.selectedImageFile = null;
  }

  AddReviewProduct(form: NgForm): void {
    if (!this.selectedProduct) return;
    this.newReview.createdAt = new Date();
    this.newReview.productID = this.selectedProduct.id;
    this.newReview.userID = this._AuthService.getCurrentUserID()!;

    this._ReviewService.AddReview(this.newReview).subscribe({
      next: (res) => {
        form.resetForm();
        this.selectedProduct = null;
        this.closeReviewModal();
      },
      error: (err) => {
        console.error('Error adding review:', err);
      }
    });
  }

  closeReviewModal(): void {
    const modalEl = document.getElementById('reviewModal');
    if (modalEl) {
      const modalInstance = (window as any).bootstrap.Modal.getInstance(modalEl);
      modalInstance?.hide();
    }
  }

  getCartItems(): IProduct[] {
    return this._CartService.getCartItems();
  }
  addToCart(product: IProduct): void {
    this._CartService.addToCart(product);
  }
  removeFromCart(productId: number): void {
    this._CartService.removeFromCart(productId);
  }

  GetAllProducts(Id: number) {
    this._ProductService.GetAllProducts(Id).subscribe({
      next: (res) => {
        // console.log('Products-api:', res);
        this.products = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  GetBrandById(ID: number) {
    this._BrandService.GetBrandById(ID).subscribe({
      next: (res) => {
        this.brand = res;
        this.IsBrandOwner()
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  openProductForm(): void {
    this.selectedProduct = null;
    this.productForm.reset();
    this.selectedImageFile = null;
    this.showProductForm = true;
  }
  closeProductForm(): void {
    this.productForm.reset();
    this.selectedProduct = null;
    this.selectedImageFile = null;
    this.showProductForm = false;
  }

  getStars(rating: number): boolean[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating);
    }
    return stars;
  }

  // followBrand() {
  //   this.brand.isFollowed = !this.brand.isFollowed;
  //   const action = this.brand.isFollowed ? 'following' : 'unfollowed';
  //   alert(`You are now ${action} ${this.brand.name}!`);
  // }

  contactBrand() {
    alert('Opening contact form...');
    const contactSection = document.querySelector('.contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  shareBrand() {
    alert('Share functionality would open social sharing options.');
  }

  viewProduct(productId: number) {
    // console.log('Viewing product:', productId);
    alert(`Redirecting to product detail page for product ID: ${productId}`);
  }

  quickView(productId: number, event: Event) {
    event.stopPropagation();
    // console.log('Quick view for product:', productId);
    alert(`Quick view modal would open for product ID: ${productId}`);
  }

  loadMoreProducts() {
    alert('Loading more products...');
  }

  replyToReview(reviewId: number) {
    alert(`Reply functionality would open for review ID: ${reviewId}`);
  }

  loadMoreReviews() {
    alert('Loading more reviews...');
  }

}

