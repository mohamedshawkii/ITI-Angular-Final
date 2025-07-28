import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { environment } from '../../environments/environments';

@Injectable({ providedIn: 'root' })
export class StripeService {
  stripePromise = loadStripe('pk_test_51RmDaZH2eXz9XTmuaHOSDHlLeOu1yhdtHrMty9Fq8CzzN94iqLC2qsh0A31VQLkbBhBJEaO4pR4gQJKzEXQRCdhk005NiO9KmF');
  constructor(private http: HttpClient) { }

  createPaymentIntent(total: number) {
    return this.http.post<{ clientSecret: string }>(
      `${environment.apiUrl}/api/Payment/create-payment-intent`,
      { total }
    );
  }

}
