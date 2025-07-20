import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../Services/orders-service';
import { IOrder } from '../../interfaces/IOrder';
import { IProduct } from '../../interfaces/IProduct';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss'
})
export class CartComponent {
  Orders!: IOrder;
  cartItems!: IProduct[];

  _Order = inject(OrderService);

  getCartItems(): IProduct[] {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }
  checkout(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.cartItems = this.getCartItems();

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

  calculateTotal(cartItems: any[]): number {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}