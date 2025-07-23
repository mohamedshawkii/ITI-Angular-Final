import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule

interface Brand {
  id: number;
  name: string;
  category: string;
  description: string;
  icon: string;
  rating: number;
  reviewCount: number;
  productCount: number;
  yearsActive: number;
  customerCount: string;
  isFollowed: boolean;
  story: string[];
  values: BrandValue[];
  galleryImages: GalleryImage[];
  contact: ContactInfo;
  socialLinks: SocialLink[];
}

interface BrandValue {
  icon: string;
  name: string;
  description: string;
}

interface GalleryImage {
  icon: string;
  caption: string;
}

interface ContactInfo {
  email: string;
  phone: string;
  location: string;
}

interface SocialLink {
  icon: string;
  name: string;
  url: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  icon: string;
  rating: number;
  reviewCount: number;
  category: string;
  isNew: boolean;
  isWishlisted: boolean;
}

interface Review {
  id: number;
  name: string;
  avatar: string;
  date: string;
  rating: number;
  text: string;
  images?: string[];
  likes: number;
}

interface RatingBreakdown {
  stars: number;
  count: number;
  percentage: number;
}

interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-brand-detail',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './brand-detail.html',
  styleUrl: './brand-detail.scss'
})
export class BrandDetailComponent implements OnInit {
  brand: Brand = {
    id: 1,
    name: 'Artisan Bakery',
    category: 'Food & Beverages',
    description: 'Fresh sourdough breads and pastries made with traditional techniques passed down through generations.',
    icon: '🍞',
    rating: 4.8,
    reviewCount: 127,
    productCount: 24,
    yearsActive: 8,
    customerCount: '2.5K',
    isFollowed: false,
    story: [
      'Founded in 2016 by Maria and Giuseppe, Artisan Bakery started as a small family business with a passion for traditional bread-making techniques.',
      'What began in our home kitchen has grown into a beloved local brand, serving fresh, handcrafted breads and pastries to our community.',
      'We believe in using only the finest ingredients, sourced locally whenever possible, and taking the time needed to create products that nourish both body and soul.'
    ],
    values: [
      {
        icon: '🌱',
        name: 'Sustainability',
        description: 'We source ingredients locally and use eco-friendly packaging to minimize our environmental impact.'
      },
      {
        icon: '👨‍👩‍👧‍👦',
        name: 'Family Tradition',
        description: 'Our recipes have been passed down through generations, preserving authentic flavors and techniques.'
      },
      {
        icon: '🤝',
        name: 'Community',
        description: 'We believe in supporting our local community and building lasting relationships with our customers.'
      }
    ],
    galleryImages: [
      { icon: '🏪', caption: 'Our cozy bakery storefront' },
      { icon: '👨‍🍳', caption: 'Master baker at work' },
      { icon: '🥖', caption: 'Fresh bread from the oven' },
      { icon: '🌾', caption: 'Premium organic ingredients' }
    ],
    contact: {
      email: 'hello@artisanbakery.com',
      phone: '+1 (555) 123-4567',
      location: 'Downtown District, Main Street'
    },
    socialLinks: [
      { icon: '📘', name: 'Facebook', url: '#' },
      { icon: '📷', name: 'Instagram', url: '#' },
      { icon: '🐦', name: 'Twitter', url: '#' }
    ]
  };

  products: Product[] = [
    {
      id: 1,
      name: 'Sourdough Bread',
      description: 'Traditional sourdough with a perfect crust and tangy flavor',
      price: 8.99,
      icon: '🍞',
      rating: 4.9,
      reviewCount: 45,
      category: 'Breads',
      isNew: false,
      isWishlisted: false
    },
    {
      id: 2,
      name: 'Chocolate Croissants',
      description: 'Buttery, flaky pastries filled with rich dark chocolate',
      price: 3.50,
      originalPrice: 4.00,
      discount: 12,
      icon: '🥐',
      rating: 4.7,
      reviewCount: 32,
      category: 'Pastries',
      isNew: true,
      isWishlisted: true
    },
    {
      id: 3,
      name: 'Artisan Pizza Dough',
      description: 'Pre-made pizza dough ready for your favorite toppings',
      price: 5.99,
      icon: '🍕',
      rating: 4.6,
      reviewCount: 28,
      category: 'Specialty',
      isNew: false,
      isWishlisted: false
    },
    {
      id: 4,
      name: 'Cinnamon Rolls',
      description: 'Warm, gooey cinnamon rolls with cream cheese frosting',
      price: 12.99,
      icon: '🌀',
      rating: 4.8,
      reviewCount: 56,
      category: 'Pastries',
      isNew: false,
      isWishlisted: false
    },
    {
      id: 5,
      name: 'Whole Grain Bread',
      description: 'Nutritious whole grain bread packed with seeds and nuts',
      price: 9.99,
      icon: '🌾',
      rating: 4.5,
      reviewCount: 23,
      category: 'Breads',
      isNew: false,
      isWishlisted: true
    },
    {
      id: 6,
      name: 'Fruit Tarts',
      description: 'Seasonal fruit tarts with vanilla custard filling',
      price: 15.99,
      icon: '🥧',
      rating: 4.9,
      reviewCount: 41,
      category: 'Desserts',
      isNew: true,
      isWishlisted: false
    }
  ];

  reviews: Review[] = [
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: '👩',
      date: 'June 15, 2025',
      rating: 5,
      text: 'Absolutely amazing bread! The sourdough has the perfect texture and flavor. I\'ve been a customer for 2 years and they never disappoint.',
      images: ['📸', '📸'],
      likes: 12
    },
    {
      id: 2,
      name: 'Mike Chen',
      avatar: '👨',
      date: 'June 10, 2025',
      rating: 4,
      text: 'Great quality pastries and friendly service. The chocolate croissants are my favorite weekend treat.',
      likes: 8
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      avatar: '👩',
      date: 'June 5, 2025',
      rating: 5,
      text: 'Love supporting this local business! Everything is made with such care and attention to detail.',
      likes: 15
    }
  ];

  ratingBreakdown: RatingBreakdown[] = [
    { stars: 5, count: 89, percentage: 70 },
    { stars: 4, count: 25, percentage: 20 },
    { stars: 3, count: 8, percentage: 6 },
    { stars: 2, count: 3, percentage: 2 },
    { stars: 1, count: 2, percentage: 2 }
  ];

  filteredProducts: Product[] = [];
  productCategories: string[] = [];
  selectedCategory = '';
  sortBy = 'name';
  hasMoreProducts = false;

  contactMessage: ContactMessage = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
    showProductForm = false;


  constructor(private route: ActivatedRoute) {}
  // دالة لفتح الفورم
   // --- Modal Functions ---
  openProductForm(): void { this.showProductForm = true; }
  closeProductForm(): void { this.showProductForm = false; }
  ngOnInit() {
    // Get brand ID from route params
    const brandId = this.route.snapshot.paramMap.get('id');
    console.log('Brand ID:', brandId);
    
    // Initialize products
    this.filteredProducts = [...this.products];
    this.productCategories = [...new Set(this.products.map(p => p.category))];
  }

  getStars(rating: number): boolean[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating);
    }
    return stars;
  }

  followBrand() {
    this.brand.isFollowed = !this.brand.isFollowed;
    const action = this.brand.isFollowed ? 'following' : 'unfollowed';
    alert(`You are now ${action} ${this.brand.name}!`);
  }

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

  filterProducts() {
    if (this.selectedCategory) {
      this.filteredProducts = this.products.filter(p => p.category === this.selectedCategory);
    } else {
      this.filteredProducts = [...this.products];
    }
    this.sortProducts();
  }

  sortProducts() {
    switch (this.sortBy) {
      case 'price-low':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        this.filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        this.filteredProducts.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    }
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

  addToCart(productId: number, event: Event) {
    event.stopPropagation();
    const product = this.products.find(p => p.id === productId);
    if (product) {
      alert(`Added ${product.name} to cart!`);
    }
  }

  addToWishlist(productId: number, event: Event) {
    event.stopPropagation();
    const product = this.products.find(p => p.id === productId);
    if (product) {
      product.isWishlisted = !product.isWishlisted;
      const action = product.isWishlisted ? 'added to' : 'removed from';
      alert(`${product.name} ${action} wishlist!`);
    }
  }

  loadMoreProducts() {
    alert('Loading more products...');
  }

  likeReview(reviewId: number) {
    const review = this.reviews.find(r => r.id === reviewId);
    if (review) {
      review.likes++;
    }
  }

  replyToReview(reviewId: number) {
    alert(`Reply functionality would open for review ID: ${reviewId}`);
  }

  loadMoreReviews() {
    alert('Loading more reviews...');
  }


  sendMessage() {
    if (this.contactMessage.name && this.contactMessage.email && this.contactMessage.message) {
      alert(`Thank you ${this.contactMessage.name}! Your message has been sent to ${this.brand.name}.`);
      this.contactMessage = { name: '', email: '', subject: '', message: '' };
    }
  }
}

