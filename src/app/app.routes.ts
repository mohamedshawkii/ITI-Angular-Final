import { Routes } from '@angular/router';
import { BrandsComponent } from './pages/brands/brands.component';
import { BrandDetailComponent } from './pages/brand-detail/brand-detail';
import { ProductDetailComponent } from './pages/product-detail/product-detail';
import { SubscriptionsComponent } from './pages/subscriptions/subscriptions';
import { CartComponent } from './pages/cart/cart';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard';
import { Users } from './pages/admin-dashboard/components/users/users';
import { BazaarComponent } from './pages/bazaar/bazaar.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'brands', component: BrandsComponent },
  { path: 'brand/:id', component: BrandDetailComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'subscriptions', component: SubscriptionsComponent },
  { path: 'bazaar', component: BazaarComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'admin', component: AdminDashboardComponent,
    children: [
      { path: 'users', component: Users },
    ]
  },
  { path: '**', redirectTo: '/home' } //or 404 page
];

