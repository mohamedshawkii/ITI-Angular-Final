import { Component, OnInit, inject } from '@angular/core';
import { Stripe } from '@stripe/stripe-js';
import { StripeService } from '../../Services/stripe-service';
import { firstValueFrom } from 'rxjs';
import { CartService } from '../../Services/cart-service';
import { OrderService } from '../../Services/order-service';

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

  _StripeService = inject(StripeService);
  _CartService = inject(CartService);
  _OrderService = inject(OrderService);


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

      if (result.error) {
        console.error('Payment failed:', result.error.message);
        alert('Payment failed: ' + result.error.message);
        return;
      }

      if (result.paymentIntent.status === 'succeeded') {
        alert('Payment succeeded!');

        this._OrderService.CreateUserOrder(this._CartService.getOrder()!).subscribe({
          next: (value) => {
            localStorage.removeItem('order');
            this._CartService.clearCart();
            this._CartService.totalInCents = 0;
            this._CartService.totalInDollars = 0;
          },
          error: (err) => {
            console.error("Error submitting order:", err);
            alert("Payment succeeded but order failed.");
          }
        });
      }

    } catch (error) {
      console.error("Error during payment:", error);
      alert("Something went wrong. Please try again.");
    }
  }

}
