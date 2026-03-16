import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ClarityModule } from '@clr/angular';

@Component({
  selector: 'app-orders-view',
  standalone: true,
  imports: [ClarityModule, CurrencyPipe],
  templateUrl: './orders-view.component.html',
  styleUrls: ['./orders-view.component.scss']
})
export class OrdersViewComponent {
  orders = [
    { id: 'ORD-001', customer: 'John Doe', status: 'Pending', statusClass: 'warning', total: 250.00 },
    { id: 'ORD-002', customer: 'Jane Smith', status: 'Shipped', statusClass: 'info', total: 180.50 },
    { id: 'ORD-003', customer: 'Bob Johnson', status: 'Delivered', statusClass: 'success', total: 320.75 },
  ];
}
