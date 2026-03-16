import { Component } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-pcs-view',
  standalone: true,
  imports: [ClarityModule, CurrencyPipe],
  templateUrl: './pcs-view.component.html',
  styleUrls: ['./pcs-view.component.scss']
})
export class PcsViewComponent {
  pcs = [
    { name: 'Workstation Pro', specs: 'Intel i9 / 64GB RAM / RTX 4090', price: 3499, tier: 'High-end', tierClass: 'purple' },
    { name: 'Developer Station', specs: 'AMD Ryzen 9 / 32GB RAM / RTX 4070', price: 1899, tier: 'Mid-range', tierClass: 'blue' },
    { name: 'Office Basic', specs: 'Intel i5 / 16GB RAM / Integrated', price: 749, tier: 'Entry-level', tierClass: 'light-blue' },
  ];
}
