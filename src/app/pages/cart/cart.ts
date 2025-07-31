import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IOrder } from '../../interfaces/IOrder';
import { IProduct } from '../../interfaces/IProduct';
import { CartService } from '../../Services/cart-service';
import { Auth } from '../../Services/auth';
import { OrderService } from '../../Services/order-service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss'
})
export class CartComponent implements OnInit {
  Orders!: IOrder;
  cartItems!: IProduct[];
  isDisabled!: boolean;
  totalInDollars: number = 0;
  UserId!: string;

  _Order = inject(OrderService);
  _CartService = inject(CartService);
  _AuthService = inject(Auth);

  ngOnInit() {
    this._CartService.cart$.subscribe(cart => {
      this.cartItems = cart;
    });
    this.calculateTotal(this.cartItems);
    this.UserId = this._AuthService.getCurrentUserID()!;
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

  checkout(): void {
    this.cartItems = this._CartService.getCartItems();

    this.Orders = {
      id: 0,
      status: 0,
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
    console.log("cart", this.Orders);
    this._CartService.SaveOrder(this.Orders);
  }
}