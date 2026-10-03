import { Component } from '@angular/core';

interface OrderItem {
  name: string;
  code: string;
  size: string;
  available: number;
  spRate: number;
  qty: number;
  orderRate: number;
}

interface SalesOrder {
  id: string;
  voucherNumber: string;
  voucherType: string;
  routePlan: string;
  date: string;
  customer: string;
  balance: number;
  overdue: number;
  lastPayment: string;
  deliveryDate: string;
  notes: string;
  status: 'Pending' | 'Approved';
  authorized: boolean;
  isDraft: boolean;
  items: OrderItem[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  order: SalesOrder = {
    id: '',
    voucherNumber: '',
    voucherType: '',
    routePlan: '',
    date: '',
    customer: '',
    balance: 0,
    overdue: 0,
    lastPayment: '',
    deliveryDate: '',
    notes: '',
    status: 'Pending',
    authorized: false,
    isDraft: false,
    items: []
  };

  constructor() {
    const params = new URLSearchParams(window.location.search);
    const orderParam = params.get('order');

    if (!orderParam) {
      return;
    }

    try {
      const receivedOrder = JSON.parse(orderParam) as SalesOrder;

      if (receivedOrder && Array.isArray(receivedOrder.items)) {
        this.order = receivedOrder;
      }
    } catch (error) {
      console.error('Unable to read Sales Order data:', error);
    }
  }

  get subtotal(): number {
    return this.order.items.reduce(
      (sum, item) => sum + item.qty * item.orderRate,
      0
    );
  }

  get vat(): number {
    return this.subtotal * 0.05;
  }

  get total(): number {
    return this.subtotal + this.vat;
  }

  print(): void {
    window.print();
  }

  money(value: number): string {
    return Number(value || 0).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }
}