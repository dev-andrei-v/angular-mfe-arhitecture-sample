import { Component } from '@angular/core';

@Component({
  selector: 'app-orders-view',
  standalone: true,
  template: `
    <div class="orders-view">
      <h2>Orders View</h2>
      <p>This is the Orders micro-frontend.</p>
      <table>
        <thead>
          <tr>
            <th>Order #</th>
            <th>Customer</th>
            <th>Status</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ORD-001</td>
            <td>John Doe</td>
            <td><span class="status pending">Pending</span></td>
            <td>$250.00</td>
          </tr>
          <tr>
            <td>ORD-002</td>
            <td>Jane Smith</td>
            <td><span class="status shipped">Shipped</span></td>
            <td>$180.50</td>
          </tr>
          <tr>
            <td>ORD-003</td>
            <td>Bob Johnson</td>
            <td><span class="status delivered">Delivered</span></td>
            <td>$320.75</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .orders-view {
      padding: 24px;
    }
    h2 {
      margin: 0 0 8px;
      color: #1a1a2e;
    }
    p {
      color: #666;
      margin-bottom: 24px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      text-align: left;
      padding: 12px 16px;
      border-bottom: 1px solid #e0e0e0;
    }
    th {
      background: #f5f5f5;
      font-weight: 600;
      color: #333;
    }
    .status {
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 0.85em;
      font-weight: 500;
    }
    .status.pending { background: #fff3cd; color: #856404; }
    .status.shipped { background: #cce5ff; color: #004085; }
    .status.delivered { background: #d4edda; color: #155724; }
  `]
})
export class OrdersViewComponent {}
