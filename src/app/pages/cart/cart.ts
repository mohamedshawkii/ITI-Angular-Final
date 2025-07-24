import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../Services/orders-service';
import { IOrder } from '../../interfaces/IOrder';
import { IProduct } from '../../interfaces/IProduct';
import { CartService } from '../../Services/cart-service';

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

  _Order = inject(OrderService);
  _CartService = inject(CartService);

  ngOnInit() {
    this._CartService.cart$.subscribe(cart => {
      this.cartItems = cart;
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
    this._CartService.totalAmount = total; // Update the total amount in the cart service
    return total
  }

  checkout(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.cartItems = this._CartService.getCartItems();

    this.Orders = {
      id: 0,
      status: 0,
      deliveryBoyID: '',
      orderTypeID: 1,
      userID: user.id,
      orderDate: new Date(),
      totalAmount: this.calculateTotal(this.cartItems),
      orderDetails: this.cartItems.map((item) => ({
        orderID: 0,
        productID: item.id,
        quantity: item.quantity,
        price: item.price
      }))
    };

    this._Order.createOrder(this.Orders).subscribe({
      next: (value) => {
        localStorage.removeItem('cart');
        console.log('Order submitted!', value);
      },
      error: (err) => {
        console.error(err)
      }
    });
  }


}