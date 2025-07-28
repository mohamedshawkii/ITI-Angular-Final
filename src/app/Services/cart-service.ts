import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../interfaces/IProduct';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartSubject = new BehaviorSubject<IProduct[]>(this.loadCartFromStorage());
  cart$ = this.cartSubject.asObservable();
  totalAmount: number = 0;

  private loadCartFromStorage(): IProduct[] {
    try {
      const storedCart = localStorage.getItem('cart');
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (e) {
      console.error('Failed to parse cart from storage', e);
      return [];
    }
  }

  private saveCartToStorage(cart: IProduct[]): void {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  private updateCart(cart: IProduct[]): void {
    this.cartSubject.next(cart);
    this.saveCartToStorage(cart); // Save to localStorage every time it's updated
  }

  // Public methods
  getCartItems(): IProduct[] {
    return this.cartSubject.getValue(); // current value
  }
  getTotalItems(): number {
    return this.getCartItems().reduce((total, item) => total + (item.quantity || 0), 0);
  }

  addToCart(product: IProduct): void {
    const cart = this.getCartItems();
    const existingProduct = cart.find(p => p.id === product.id);

    if (existingProduct) {
      existingProduct.quantity = (existingProduct.quantity || 0) + 1;
    } else {
      const productToAdd = { ...product, quantity: 1 };
      cart.push(productToAdd);
    }

    this.updateCart(cart);
  }

  removeFromCart(productId: number): void {
    const updatedCart = this.getCartItems().filter(p => p.id !== productId);
    this.updateCart(updatedCart);
  }

  clearCart(): void {
    this.updateCart([]);
  }

}
