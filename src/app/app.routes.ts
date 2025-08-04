import { Routes } from '@angular/router';
import { BrandsComponent } from './pages/brands/brands.component';
import { BrandDetailComponent } from './pages/brand-detail/brand-detail';
import { ProductDetailComponent } from './pages/product-detail/product-detail';
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
import { RoleGuard } from '../app/guards/role-guard';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard';
import { DeliveryHistoryUser } from './pages/user-dashboard/components/delivery-history-user/delivery-history-user';
import { AvailableOrdersUser } from './pages/user-dashboard/components/available-orders-user/available-orders-user';
import { MyOrdersUser } from './pages/user-dashboard/components/my-orders-user/my-orders-user';
import { BrandDashboardComponent } from './pages/brand-dashboard/brand-dashboard';
import { DeliveryHistoryBrand } from './pages/brand-dashboard/components/delivery-history-brand/delivery-history-brand';
import { MyOrdersBrand } from './pages/brand-dashboard/components/my-orders-brand/my-orders-brand';
import { AvailableOrdersBrand } from './pages/brand-dashboard/components/available-orders-brand/available-orders-brand';
import { NotDeliveryBoyGuard } from './guards/not-delivery-boy-guard';
import { EditBrandComponent } from './pages/brands/components/edit-brand/edit-brand.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  {
    path: 'brands',
    component: BrandsComponent,
    canActivate: [RoleGuard],
    data: { roles: ['Customer', 'BrandOwner'] },
  },
  {
    path: 'brands/add',
    component: AddBrand,
    canActivate: [RoleGuard],
    data: { roles: ['ADMIN', 'BrandOwner'] },
  },
  {
    path: 'edit-brand/:id',
    component: EditBrandComponent,
    canActivate: [RoleGuard],
    data: { roles: ['ADMIN', 'BrandOwner'] },
  },
  {
    path: 'brand/:id',
    component: BrandDetailComponent,
    canActivate: [RoleGuard],
    data: { roles: ['ADMIN', 'Customer', 'BrandOwner'] },
  },
  {
    path: 'product/:id',
    component: ProductDetailComponent,
    canActivate: [RoleGuard],
    data: { roles: ['ADMIN', 'Customer', 'BrandOwner'] },
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [RoleGuard],
    data: { roles: ['ADMIN', 'Customer', 'BrandOwner'] },
  },
  {
    path: 'bazaar',
    component: BazaarComponent,
    canActivate: [RoleGuard],
    data: { roles: ['ADMIN', 'Customer', 'BrandOwner'] },
  },
  {
    path: 'payment',
    component: StripePayment,
    canActivate: [RoleGuard],
    data: { roles: ['ADMIN', 'Customer', 'BrandOwner'] },
  },
  // {
  //   path: 'subscriptions',
  //   component: SubscriptionsComponent,
  //   canActivate: [RoleGuard],
  //   data: { roles: ['ADMIN', 'Customer', 'BrandOwner'] },
  // },

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
        data: { roles: ['ADMIN'] },
      },
      {
        path: 'createBazar',
        component: Bazar,
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN'] },
      },
    ],
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
        data: { roles: ['DeliveryBoy'] },
      },
      {
        path: 'myorders',
        component: MyOrders,
        canActivate: [RoleGuard],
        data: { roles: ['DeliveryBoy'] },
      },
      {
        path: 'available',
        component: AvailableOrders,
        canActivate: [RoleGuard],
        data: { roles: ['DeliveryBoy'] },
      },
    ],
  },

  {
    path: 'customerDashboard',
    component: UserDashboardComponent,
    canActivate: [RoleGuard],
    data: { roles: ['ADMIN', 'Customer'] },
    children: [
      {
        path: 'history',
        component: DeliveryHistoryUser,
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN', 'Customer'] },
      },
      {
        path: 'myorders',
        component: MyOrdersUser,
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN', 'Customer'] },
      },
      {
        path: 'available',
        component: AvailableOrdersUser,
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN', 'Customer'] },
      },
    ],
  },

  {
    path: 'brandDashboard',
    component: BrandDashboardComponent,
    canActivate: [RoleGuard],
    data: { roles: ['ADMIN', 'BrandOwner'] },
    children: [
      {
        path: 'history',
        component: DeliveryHistoryBrand,
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN', 'BrandOwner'] },
      },
      {
        path: 'myorders',
        component: MyOrdersBrand,
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN', 'BrandOwner'] },
      },
      {
        path: 'available',
        component: AvailableOrdersBrand,
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN', 'BrandOwner'] },
      },
    ],
  },

  { path: '**', redirectTo: '/home' },
];
