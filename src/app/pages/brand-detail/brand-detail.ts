import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IProduct } from '../../interfaces/IProduct';
import { BrandService } from '../../Services/brand.service';
import { ProductService } from '../../Services/product-service';
import { CartService } from '../../Services/cart-service';
import { environment } from '../../../environments/environments';
import { IReview } from '../../interfaces/IReview';
import { ReviewService } from '../../Services/review-service';
import { Auth } from '../../Services/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-brand-detail',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './brand-detail.html',
  styleUrls: ['./brand-detail.scss'], // صححت هنا
})
export class BrandDetailComponent implements OnInit, OnDestroy {
  brand!: any;
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
    productID: 0,
  };
  showReviewForm = false;
  showProductForm = false;
  ProductReviews: IReview[] = [];
  stars = [1, 2, 3, 4, 5];

  private cartSubscription!: Subscription;

  _AuthService = inject(Auth);
  _BrandService = inject(BrandService);
  _ProductService = inject(ProductService);
  _CartService = inject(CartService);
  _ReviewService = inject(ReviewService);

  constructor(private route: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      quantity: ['', [Validators.required, Validators.min(0)]],
      brandID: ['', Validators.required],
    });

    // الاشتراك في الكارت
    this.cartSubscription = this._CartService.cart$.subscribe((items) => {
      this.cartItems = items;
    });

    const ParamId = this.route.snapshot.paramMap.get('id');
    if (!ParamId) {
      console.error('Brand ID not found in route parameters.');
      return;
    }

    this.BrandId = parseInt(ParamId);
    this.GetBrandById(this.BrandId);
    this.GetAllProducts(this.BrandId);
    this.productForm.patchValue({ brandID: this.BrandId });
    this.GetProductReviews(this.BrandId);
  }

  ngOnDestroy(): void {
    // إلغاء الاشتراك لتفادي تسرب الذاكرة
    this.cartSubscription.unsubscribe();
  }

  GetProductReviews(brandId: number) {
    this._ReviewService.BrandReviews(brandId).subscribe({
      next: (res) => (this.ProductReviews = res),
      error: (err) => console.log(err),
    });
  }

  closeReviewForm() {
    this.showReviewForm = false;
  }

  DisplayBasedOnRole(Role: string): boolean {
    return this._AuthService.getRole() === Role;
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
    if (this.productForm.invalid) {
      console.log('Form is invalid');
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

    if (this.selectedProduct) {
      formData.append('id', this.selectedProduct.id.toString());
    }

    const request = this.selectedProduct
      ? this._ProductService.UpdateProduct(formData)
      : this._ProductService.CreateProduct(formData);

    request.subscribe({
      next: (res) => {
        if (this.selectedProduct) {
          const index = this.products.findIndex((p) => p.id === res.id);
          if (index !== -1) this.products[index] = res;
        } else {
          this.products.push(res);
        }
        this.resetProductForm();
      },
      error: (err) => console.error('Error saving product:', err),
    });
  }

  resetProductForm() {
    this.selectedProduct = null;
    this.selectedImageFile = null;
    this.productForm.reset();
    this.productForm.patchValue({ brandID: this.BrandId });
    this.closeProductForm();
  }

  selectProduct(product: IProduct): void {
    this.selectedProduct = { ...product };
    this.productForm.patchValue({
      name: product.name ?? '',
      description: product.description ?? '',
      price: product.price ?? 0,
      quantity: product.quantity ?? 0,
      brandID: product.brandID ?? this.BrandId,
    });
    this.openProductForm();
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
        this.showReviewForm = false; // بدل استخدام Bootstrap JS modal
      },
      error: (err) => console.error('Error adding review:', err),
    });
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
      next: (res) => (this.products = res),
      error: (err) => console.log(err),
    });
  }

  GetBrandById(ID: number) {
    this._BrandService.GetBrandById(ID).subscribe({
      next: (res) => (this.brand = res),
      error: (err) => console.log(err),
    });
  }

  openProductForm(): void {
    this.showProductForm = true;
  }

  closeProductForm(): void {
    this.showProductForm = false;
  }

  getStars(rating: number): boolean[] {
    return Array.from({ length: 5 }, (_, i) => i < rating);
  }

  contactBrand() {
    alert('Opening contact form...');
    document
      .querySelector('.contact-section')
      ?.scrollIntoView({ behavior: 'smooth' });
  }

  shareBrand() {
    alert('Share functionality would open social sharing options.');
  }

  viewProduct(productId: number) {
    alert(`Redirecting to product detail page for product ID: ${productId}`);
  }

  quickView(productId: number, event: Event) {
    event.stopPropagation();
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

  trackByProductId(index: number, product: IProduct): number {
    return product.id;
  }

  openEditForm(product: IProduct): void {
    this.selectedProduct = { ...product }; // ننسخ بيانات المنتج المحدد
    this.productForm.patchValue(product); // نملأ الفورم بالبيانات دي
    this.openProductForm(); // نفتح المودال
  }
}
