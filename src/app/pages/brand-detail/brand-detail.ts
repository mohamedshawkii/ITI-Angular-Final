import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms'; // Import FormsModule
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

  constructor(private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      brandID: ['', Validators.required],
    });

    this._CartService.cart$.subscribe(items => {
      this.cartItems = items;
    });
    // Get brand ID from route params
    const ParamId = this.route.snapshot.paramMap.get('id');
    if (!ParamId) {
      return;
    }
    this.BrandId = parseInt(ParamId);
    this.GetBrandById(this.BrandId);
    this.GetAllProducts(this.BrandId);
    this.productForm.patchValue({ brandID: this.BrandId });
    this.GetProductReviews(this.BrandId);
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

  closeReviewForm() {
    this.showReviewForm = false;

  }

  DisplayBasedOnRole(Role: string): boolean {
    const userRole = this._AuthService.getRole();
    return userRole == Role;
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
    if (!this.productForm.invalid) {
      const formData = new FormData();

      formData.append('name', this.productForm.value.name);
      formData.append('description', this.productForm.value.description);
      formData.append('price', this.productForm.value.price.toString());
      formData.append('quantity', this.productForm.value.quantity.toString());
      formData.append('brandID', this.productForm.value.brandID.toString());

      if (this.selectedImageFile) {
        formData.append('ImageFile', this.selectedImageFile);
      }

      this._ProductService.CreateProduct(formData).subscribe({
        next: (res) => {
          // console.log('Product created:', res);
          this.products.push(res);
          this.closeProductForm();
          this.productForm.reset();
        },
        error: (err) => {
          console.error('Error creating product:', err);
        }
      });
    }
    else {
      console.log('Form is invalid');
    }
  }

  selectProduct(product: IProduct): void {
    this.selectedProduct = { ...product };
  }

  AddReviewProduct(form: NgForm): void {
    if (!this.selectedProduct) return;

    this.newReview.createdAt = new Date();
    this.newReview.productID = this.selectedProduct.id;
    this.newReview.userID = this._AuthService.getCurrentUserID()!;

    this._ReviewService.AddReview(this.newReview).subscribe({
      next: (res) => {
        // console.log('Review added successfully:', res);
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
        // console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  openProductForm(): void { this.showProductForm = true; }
  closeProductForm(): void { this.showProductForm = false; }

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

