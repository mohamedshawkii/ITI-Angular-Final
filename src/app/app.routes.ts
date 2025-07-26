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
import { Bazar } from './pages/admin-dashboard/components/bazar/bazar';
import { StripePayment } from './components/stripe-payment/stripe-payment';
import { Delivery } from './pages/delivery/delivery';
import { DeliveryHistory } from './pages/delivery/components/delivery-history/delivery-history';
import { MyOrders } from './pages/delivery/components/my-orders/my-orders';
import { AvailableOrders } from './pages/delivery/components/available-orders/available-orders';
import { AddBrand } from './pages/brands/components/add-brand/add-brand';

// Update the path below if the actual file name or location is different, e.g. './guards/role.guard.ts' or './guards/role.guard.service'
import { RoleGuard } from '../app/guards/role-guard';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },


  {
    path: 'brands',
    component: BrandsComponent,
    canActivate: [RoleGuard],
    data: { roles: ['Customer', 'BrandOwner'] }
  },
  {
    path: 'brands/add',
    component: AddBrand,
    canActivate: [RoleGuard],
    data: { roles: ['BrandOwner'] }
  },
  {
    path: 'brand/:id',
    component: BrandDetailComponent,
    canActivate: [RoleGuard],
    data: { roles: ['Customer', 'BrandOwner'] }
  },
  {
    path: 'product/:id',
    component: ProductDetailComponent,
    canActivate: [RoleGuard],
    data: { roles: ['Customer', 'BrandOwner'] }
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [RoleGuard],
    data: { roles: ['Customer', 'BrandOwner'] }
  },
  {
    path: 'bazaar',
    component: BazaarComponent,
    canActivate: [RoleGuard],
    data: { roles: ['Customer', 'BrandOwner'] }
  },
  {
    path: 'payment',
    component: StripePayment,
    canActivate: [RoleGuard],
    data: { roles: ['Customer', 'BrandOwner'] }
  },
  {
    path: 'subscriptions',
    component: SubscriptionsComponent,
    canActivate: [RoleGuard],
    data: { roles: ['Customer', 'BrandOwner'] }
  },

  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [RoleGuard],
    data: { roles: ['ADMIN'] },
    children: [
      {
        path: 'users',
        component: Users,
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN'] }
      },
      {
        path: 'createBazar',
        component: Bazar,
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN'] }
      }
    ]
  },

  {
    path: 'delivery',
    component: Delivery,
    canActivate: [RoleGuard],
    data: { roles: ['DeliveryBoy'] },
    children: [
      {
        path: 'history',
        component: DeliveryHistory,
        canActivate: [RoleGuard],
        data: { roles: ['DeliveryBoy'] }
      },
      {
        path: 'myorders',
        component: MyOrders,
        canActivate: [RoleGuard],
        data: { roles: ['DeliveryBoy'] }
      },
      {
        path: 'available',
        component: AvailableOrders,
        canActivate: [RoleGuard],
        data: { roles: ['DeliveryBoy'] }
      }
    ]
  },

  { path: '**', redirectTo: '/home' }
];
