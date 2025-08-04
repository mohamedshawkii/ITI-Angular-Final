import { Component, OnInit, inject } from '@angular/core';
import { Stripe } from '@stripe/stripe-js';
import { StripeService } from '../../Services/stripe-service';
import { firstValueFrom } from 'rxjs';
import { CartService } from '../../Services/cart-service';
import { OrderService } from '../../Services/order-service';
import { Router } from '@angular/router';
import { IOrder } from '../../interfaces/IOrder';

@Component({
  selector: 'app-stripe-payment',
  standalone: true,
  imports: [],
  templateUrl: './stripe-payment.html',
  styleUrls: ['./stripe-payment.scss']
})
export class StripePayment implements OnInit {
  stripe!: Stripe;
  cardElement: any;
  totalAmount!: number;
  Orders!: IOrder;

  _StripeService = inject(StripeService);
  _CartService = inject(CartService);
  _OrderService = inject(OrderService);
  _Route = inject(Router);


  async ngOnInit() {
    const stripe = await this._StripeService.stripePromise;
    if (!stripe) {
      alert('Stripe failed to load.');
      return;
    }
    this.stripe = stripe;

    this.totalAmount = this._CartService.totalInDollars || 0;

    const elements = this.stripe.elements();
    this.cardElement = elements.create('card');
    this.cardElement.mount('#card-element');
    this.Orders = this._CartService.getOrder()!;
  }

  async pay() {
    try {
      const response = await firstValueFrom(
        this._StripeService.createPaymentIntent(this._CartService.totalInCents)
      );

      const result = await this.stripe.confirmCardPayment(response.clientSecret, {
        payment_method: {
          card: this.cardElement
        }
      });

      const savedOrder = this._CartService.getOrder();

      if (!savedOrder) {
        alert('Payment succeeded, but no order found. Please try again.');
        this._Route.navigate(['/cart']);
        return;
      }

      savedOrder.paymentMethod = 'Visa/MasterCard';

      this._OrderService.CreateUserOrder(savedOrder).subscribe({
        next: () => {
          localStorage.removeItem('order');
          this._CartService.clearCart();
          this._CartService.totalInCents = 0;
          this._CartService.totalInDollars = 0;
          alert('Your order has been placed successfully!');
          this._Route.navigate(['/home']);
        },
        error: (err) => {
          console.error('Order creation failed:', err);
          alert('Payment succeeded, but order could not be saved. Please contact support.');
        }
      });

    } catch (error) {
      console.error('Unexpected error during payment:', error);
      alert('Something went wrong during payment. Please try again.');
      this._Route.navigate(['/cart']);
    }
  }

}
