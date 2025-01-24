import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TieredMenu } from 'primeng/tieredmenu';
import { BadgeModule } from 'primeng/badge';
import { CommonModule } from '@angular/common';
import { Ripple } from 'primeng/ripple';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
  standalone: true,
  imports: [TieredMenu, BadgeModule, Ripple, CommonModule],
  encapsulation: ViewEncapsulation.None,
})
export class MenuComponent implements OnInit{
  items: MenuItem[] | undefined;


    ngOnInit() {
        this.items = [
            {
                label: 'Complementos',
                icon: 'pi pi-file',
                items: [
                  {
                    label: 'Accesorios de almacenamiento',
                    icon: 'pi pi-plus',
                    },
                    {
                        label: 'Bufandas',
                        icon: 'pi pi-plus',
                    },
                    {
                        label: 'Cinturones',
                        icon: 'pi pi-folder-open',
                    },
                    {
                        label: 'Corbatas',
                        icon: 'pi pi-print',
                    },{
                      label: 'Gorras',
                      icon: 'pi pi-plus',
                  },
                  {
                      label: 'Guantes',
                      icon: 'pi pi-folder-open',
                  }
                ]
            },
            {
                label: 'Ropa',
                icon: 'pi pi-file-edit',
                items: [
                    {
                        label: 'Camisas',
                        icon: 'pi pi-copy'
                    },
                    {
                        label: 'Chaquetas',
                        icon: 'pi pi-times'
                    },
                    {
                      label: 'Faldas',
                      icon: 'pi pi-copy'
                  },
                  {
                        label: 'Jerseis',
                        icon: 'pi pi-times'
                    },{
                      label: 'Pantalones',
                      icon: 'pi pi-copy'
                  },
                  {
                      label: 'Ropa de baño',
                      icon: 'pi pi-times'
                  },
                  {
                    label: 'Sudaderas',
                    icon: 'pi pi-copy'
                },
                {
                    label: 'Vestidos',
                    icon: 'pi pi-times'
                }
                ]
            },
            {
                label: 'Zapatillas',
                icon: 'pi pi-search'
            }
        ]
    }
}


