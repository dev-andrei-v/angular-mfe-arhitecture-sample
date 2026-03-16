import { Component } from '@angular/core';

@Component({
  selector: 'app-pcs-view',
  standalone: true,
  template: `
    <div class="pcs-view">
      <h2>PCs View</h2>
      <p>This is the PCs micro-frontend.</p>
      <div class="card-grid">
        <div class="card">
          <h3>Workstation Pro</h3>
          <p class="specs">Intel i9 / 64GB RAM / RTX 4090</p>
          <p class="price">$3,499</p>
        </div>
        <div class="card">
          <h3>Developer Station</h3>
          <p class="specs">AMD Ryzen 9 / 32GB RAM / RTX 4070</p>
          <p class="price">$1,899</p>
        </div>
        <div class="card">
          <h3>Office Basic</h3>
          <p class="specs">Intel i5 / 16GB RAM / Integrated</p>
          <p class="price">$749</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .pcs-view {
      padding: 24px;
    }
    h2 {
      margin: 0 0 8px;
      color: #1a1a2e;
    }
    .pcs-view > p {
      color: #666;
      margin-bottom: 24px;
    }
    .card-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
    }
    .card {
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 20px;
      background: #fafafa;
    }
    .card h3 {
      margin: 0 0 8px;
      color: #1a1a2e;
    }
    .specs {
      color: #666;
      font-size: 0.9em;
      margin: 0 0 12px;
    }
    .price {
      font-size: 1.25em;
      font-weight: 700;
      color: #2d6a4f;
      margin: 0;
    }
  `]
})
export class PcsViewComponent {}
