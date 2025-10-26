import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { ConfigurationService } from '../../services/configuration.service';

@Component({
  selector: 'app-navbar',
  imports: [MenubarModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar implements OnInit {
  items: MenuItem[] | undefined;

  constructor(private configService: ConfigurationService) { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Product Inventory',
        routerLink: 'product-inventory',
        icon: 'pi pi-warehouse'
      },
      {
        label: 'Configurations',
        routerLink: 'configurations',
        icon: 'pi pi-cog',
      },
      {
        label: 'To do List',
        routerLink: 'todo-list'
      }
    ]
  }
}
