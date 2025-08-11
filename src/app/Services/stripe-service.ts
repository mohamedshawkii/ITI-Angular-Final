import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { environment } from '@env/environments';

@Injectable({ providedIn: 'root' })
export class StripeService {
  stripePromise: Promise<Stripe | null>;
  EURL = environment.apiUrl;


  constructor(private http: HttpClient) {
    this.stripePromise = loadStripe('pk_test_51RmDaZH2eXz9XTmuaHOSDHlLeOu1yhdtHrMty9Fq8CzzN94iqLC2qsh0A31VQLkbBhBJEaO4pR4gQJKzEXQRCdhk005NiO9KmF');
  }

  createPaymentIntent(total: number) {
    return this.http.post<{ clientSecret: string; paymentIntentId: string; }>(
      `${environment.apiUrl}/api/Payment/create-payment-intent`,
      { total }
    );
  }
  getStripe() {
    return this.stripePromise;
  }
}
