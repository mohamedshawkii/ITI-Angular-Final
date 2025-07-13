import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ComparisonFeature {
  name: string;
  free: boolean | string;
  premium: boolean | string;
  business: boolean | string;
}

interface FAQ {
  question: string;
  answer: string;
  isOpen: boolean;
}

@Component({
  selector: 'app-subscriptions',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './subscriptions.html',
  styleUrl: './subscriptions.scss'
})
export class SubscriptionsComponent implements OnInit {
  billingPeriod: 'monthly' | 'yearly' = 'monthly';
  isYearlyBilling = false;

  comparisonFeatures: ComparisonFeature[] = [
    { name: 'Browse all brands', free: true, premium: true, business: true },
    { name: 'Customer support', free: 'Basic', premium: 'Priority', business: 'Dedicated' },
    { name: 'Monthly newsletter', free: true, premium: true, business: true },
    { name: 'Bazaar event access', free: 'Public only', premium: 'Exclusive access', business: 'VIP access' },
    { name: 'Shipping discounts', free: false, premium: 'Free over $50', business: 'Free shipping' },
    { name: 'Order discounts', free: false, premium: '10%', business: '15%' },
    { name: 'Early brand access', free: false, premium: true, business: true },
    { name: 'Product samples', free: false, premium: 'Monthly', business: 'Weekly' },
    { name: 'Brand dashboard', free: false, premium: false, business: true },
    { name: 'Sales analytics', free: false, premium: false, business: true },
    { name: 'Marketing tools', free: false, premium: false, business: true },
    { name: 'Account manager', free: false, premium: false, business: true }
  ];

  faqs: FAQ[] = [
    {
      question: 'Can I change my plan anytime?',
      answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.',
      isOpen: false
    },
    {
      question: 'Is there a free trial for Premium?',
      answer: 'Yes, we offer a 14-day free trial for the Premium plan. No credit card required to start.',
      isOpen: false
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and bank transfers for annual subscriptions.',
      isOpen: false
    },
    {
      question: 'Can I cancel my subscription?',
      answer: 'You can cancel your subscription at any time. You\'ll continue to have access until the end of your current billing period.',
      isOpen: false
    },
    {
      question: 'Do you offer refunds?',
      answer: 'We offer a 30-day money-back guarantee for all paid plans. Contact our support team for assistance.',
      isOpen: false
    },
    {
      question: 'What happens to my data if I cancel?',
      answer: 'Your account data will be preserved for 90 days after cancellation, allowing you to reactivate without losing your preferences.',
      isOpen: false
    }
  ];

  ngOnInit() {
    // Initialize component
  }

  toggleBilling() {
    this.billingPeriod = this.isYearlyBilling ? 'yearly' : 'monthly';
  }

  getPremiumPrice(): number {
    return this.billingPeriod === 'yearly' ? 96 : 9.99;
  }

  getBusinessPrice(): number {
    return this.billingPeriod === 'yearly' ? 240 : 24.99;
  }

  selectPlan(planType: 'free' | 'premium' | 'business') {
    console.log(`Selected plan: ${planType} (${this.billingPeriod})`);
    
    if (planType === 'free') {
      alert('Welcome to Betna! Your free account is ready to use.');
    } else {
      alert(`You selected the ${planType} plan (${this.billingPeriod}). Redirecting to payment...`);
      // In a real app, this would redirect to a payment processor
    }
  }

  toggleFaq(index: number) {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }
}

