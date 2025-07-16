import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrderDetails } from '../../Services/order-details';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss'
})
export class CartComponent {
  OrderDetails: any[] = [];
  Product: any[] = [];

  _OrderDetails = inject(OrderDetails);

  ngOnInit(): void {
    this.GetAll();
  }

  GetAll(): void {
    this._OrderDetails.GetAll().subscribe({
      next: (value) => {
        this.OrderDetails = value;
        console.log(value);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

