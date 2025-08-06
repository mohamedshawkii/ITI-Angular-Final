import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IOrder } from '@interfaces/IOrder';
import { IProduct } from '@interfaces/IProduct';
import { CartService } from '@services/cart-service';
import { Auth } from '@services/auth';
import { OrderService } from '@services/order-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss'
})
export class CartComponent implements OnInit {
  Orders!: IOrder;
  cartItems!: IProduct[];
  isDisabled!: boolean;
  totalInDollars: number = 0;
  UserId!: string;
  isCashOnDelivery: boolean = false;

  _Order = inject(OrderService);
  _CartService = inject(CartService);
  _AuthService = inject(Auth);
  _OrderService = inject(OrderService);
  _Router = inject(Router);

  ngOnInit() {
    this.UserId = this._AuthService.getCurrentUserID()!;

    this._CartService.cart$.subscribe(cart => {
      this.cartItems = cart;
      this.calculateTotal(this.cartItems);
      this.Orders = {
        id: 0,
        status: 0,
        paymentMethod: '',
        deliveryBoyID: null,
        orderTypeID: null,
        userID: this.UserId,
        orderDate: new Date(),
        totalAmount: this.calculateTotal(this.cartItems),
        orderDetails: this.cartItems.map((item) => ({
          orderID: 0,
          productID: item.id,
          quantity: item.quantity,
          price: item.price,
        }))
      };

      this._CartService.SaveOrder(this.Orders);
    });
  }

  getCartItems(): IProduct[] {
    return this._CartService.getCartItems();
  }
  removeItem(productId: number) {
    this._CartService.removeFromCart(productId);
  }
  calculateTotal(cartItems: any[]): number {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalInCents = Math.round(total * 100);
    this.totalInDollars = this._CartService.convertCentsToDollars(totalInCents);
    this._CartService.totalInCents = totalInCents;
    this._CartService.totalInDollars = this.totalInDollars;
    return this.totalInDollars;
  }

  toggleCashOnDelivery() {
    if (this.isCashOnDelivery) {
      alert('You have selected Cash on Delivery');
    }
    console.log('Pay with cash:', this.isCashOnDelivery);
  }

  checkout(): void {
    const savedOrder = this._CartService.getOrder();

    if (!savedOrder) {
      alert('No order found. Please add items again.');
      this._Router.navigate(['/cart']);
      return;
    }

    savedOrder.paymentMethod = this.isCashOnDelivery
      ? 'Cash on Delivery'
      : 'Online Payment';

    if (this.isCashOnDelivery) {
      this._OrderService.CreateUserOrder(savedOrder).subscribe({
        next: () => {
          localStorage.removeItem('order');
          this._CartService.clearCart();
          this._CartService.totalInCents = 0;
          this._CartService.totalInDollars = 0;
          this.cartItems = [];
          this.isCashOnDelivery = false;
          alert('Your order has been placed successfully!');
          this._Router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Order creation failed:', err);
        }
      });
    } else {
      // redirect to payment page
      this._Router.navigate(['/payment']);
    }
  }
}