import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'; // Import FormsModule
import { IProduct } from '../../interfaces/IProduct';
import { BrandService } from '../../Services/brand.service';
import { iBrand } from '../../interfaces/ibrand';
import { ProductService } from '../../Services/product-service';
import { CartService } from '../../Services/cart-service';

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

  hasMoreProducts = false;
  showProductForm = false;

  _BrandService = inject(BrandService);
  _ProductService = inject(ProductService);
  _CartService = inject(CartService);

  constructor(private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      image: ['', Validators.required],
      brandID: ['', Validators.required],
    });

    console.log('cart', this.getCartItems());
    this._CartService.cart$.subscribe(items => {
      this.cartItems = items;
    });
    // Get brand ID from route params
    const ParamId = this.route.snapshot.paramMap.get('id');
    if (!ParamId) {
      console.error('Brand ID not found in route parameters.');
      return;
    }
    this.BrandId = parseInt(ParamId);
    this.GetBrandById(this.BrandId);
    this.GetAllProducts(this.BrandId);
    this.productForm.patchValue({ brandID: this.BrandId });
  }

  saveProduct() {
    const newProduct: IProduct = {
      id: 0, // Assuming the backend will assign an ID
      name: this.productForm.value.name,
      description: this.productForm.value.description,
      price: this.productForm.value.price,
      quantity: this.productForm.value.quantity,
      image: this.productForm.value.image,
      brandID: this.productForm.value.brandID // or this.BrandId if you prefer
    };

    this._ProductService.CreateProduct(newProduct).subscribe({
      next: (res) => {
        console.log('Product created:', res);
        this.products.push(res); // Add the new product to the list
        this.closeProductForm();
        this.productForm.reset(); // Reset the form after submission
      },
      error: (err) => {
        console.error('Error creating product:', err);
      }
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
      next: (res) => {
        console.log(res);
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
        console.log(res);
        this.brand = res;
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
    console.log('Viewing product:', productId);
    alert(`Redirecting to product detail page for product ID: ${productId}`);
  }

  quickView(productId: number, event: Event) {
    event.stopPropagation();
    console.log('Quick view for product:', productId);
    alert(`Quick view modal would open for product ID: ${productId}`);
  }

  loadMoreProducts() {
    alert('Loading more products...');
  }

  // likeReview(reviewId: number) {
  //   const review = this.reviews.find(r => r.id === reviewId);
  //   if (review) {
  //     review.likes++;
  //   }
  // }

  replyToReview(reviewId: number) {
    alert(`Reply functionality would open for review ID: ${reviewId}`);
  }

  loadMoreReviews() {
    alert('Loading more reviews...');
  }

}

