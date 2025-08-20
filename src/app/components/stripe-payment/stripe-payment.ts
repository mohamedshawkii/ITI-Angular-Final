import { Component, OnInit, inject } from '@angular/core';
import { Stripe, StripeCardElement } from '@stripe/stripe-js';
import { StripeService } from '@services/stripe-service';
import { firstValueFrom } from 'rxjs';
import { CartService } from '@services/cart-service';
import { OrderService } from '@services/order-service';
import { IOrder } from '@interfaces/IOrder';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stripe-payment',
  standalone: true,
  imports: [],
  templateUrl: './stripe-payment.html',
  styleUrls: ['./stripe-payment.scss']
})
export class StripePayment implements OnInit {
  stripe!: Stripe;
  cardElement!: StripeCardElement;
  totalAmount!: number;
  orderData!: IOrder;

  _StripeService = inject(StripeService);
  _CartService = inject(CartService);
  _OrderService = inject(OrderService);
  _Route = inject(Router);

  async ngOnInit() {
    const stripeInstance = await this._StripeService.stripePromise;
    if (!stripeInstance) {
      alert('Stripe failed to load.');
      return;
    }
    this.stripe = stripeInstance;

    // Amount in dollars for UI (backend will convert to cents)
    this.totalAmount = this._CartService.totalInDollars || 0;
    this.orderData = this._CartService.getOrder()!;

    const elements = this.stripe.elements();
    this.cardElement = elements.create('card');
    this.cardElement.mount('#card-element');
  }

  async pay() {
    try {
      // Step 1: Ask backend to create PaymentIntent
      const paymentIntentResponse: { clientSecret: string; paymentIntentId: string } =
        await firstValueFrom(this._StripeService.createPaymentIntent(this.totalAmount));

      const { clientSecret, paymentIntentId } = paymentIntentResponse;

      // Step 2: Confirm payment with Stripe
      const { paymentIntent, error } = await this.stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: this.cardElement }
      });

      if (error) {
        alert(`Payment failed: ${error.message}`);
        return;
      }

      if (paymentIntent?.status === 'succeeded') {
        const savedOrder = this._CartService.getOrder();
        if (!savedOrder) {
          alert('Payment succeeded, but no order found. Please try again.');
          this._Route.navigate(['/cart']);
          return;
        }

        savedOrder.paymentMethod = 'Visa/MasterCard';
        savedOrder.payment = {
          paymentMethod: 'Visa/MasterCard',
          paymentStatus: 'Paid',
          transactionReference: paymentIntentId,
          paymentDate: new Date(),
          total: this.totalAmount,
        };

        this._OrderService.CreateUserOrder(savedOrder).subscribe({
          next: () => {
            localStorage.removeItem('order');
            this._CartService.clearCart();
            this._CartService.totalInDollars = 0;
            alert('Your order has been placed successfully!');
            this._Route.navigate(['/home']);
          },
          error: (err) => {
            console.error('Order creation failed:', err);
            alert('Payment succeeded, but order could not be saved. Please contact support.');
          }
        });
      }
    } catch (error) {
      console.error('Unexpected error during payment:', error);
      alert('Something went wrong during payment. Please try again.');
      this._Route.navigate(['/cart']);
    }
  }
}
