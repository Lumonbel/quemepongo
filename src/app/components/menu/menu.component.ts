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
                icon: '../../../assets/iconos/AlmacenamientoP.svg',
                items: [
                    {
                    label: 'Bolsos',
                    icon: '../../../assets/iconos/AlmacenamientoP.svg',
                    },
                    {
                        label: 'Bufandas',
                        icon: '../../../assets/iconos/BufandaP.svg',
                    },
                    {
                        label: 'Cinturones',
                        icon: '../../../assets/iconos/CinturonP.svg',
                    },
                    {
                        label: 'Corbatas',
                        icon: '../../../assets/iconos/CorbataP.svg',
                    },{
                        label: 'Gorras',
                        icon: '../../../assets/iconos/GorraP.svg',
                    },
                    {
                        label: 'Guantes',
                        icon: '../../../assets/iconos/GuantesP.svg',
                    }
                ]
            },
            {
                label: 'Ropa',
                icon: '../../../assets/iconos/CamisaP.svg',
                items: [
                    {
                        label: 'Camisas',
                        icon: '../../../assets/iconos/CamisaP.svg'
                    },
                    {
                        label: 'Chaquetas',
                        icon: '../../../assets/iconos/ChaquetaP.svg'
                    },
                    {
                        label: 'Faldas',
                        icon: '../../../assets/iconos/FaldaP.svg'
                    },
                    {
                        label: 'Jerseis',
                        icon: '../../../assets/iconos/JerseyP.svg'
                    },{
                        label: 'Pantalones',
                        icon: '../../../assets/iconos/PantalónP.svg'
                    },
                    {
                        label: 'Ropa de baño',
                        icon: '../../../assets/iconos/RopaBañoP.svg'
                    },
                    {
                    label: 'Sudaderas',
                    icon: '../../../assets/iconos/SudaderaP.svg'
                },
                {
                    label: 'Vestidos',
                    icon: '../../../assets/iconos/VestidoP.svg'
                }
                ]
            },
            {
                label: 'Zapatos',
                icon: '../../../assets/iconos/ZapatosP.svg'
            }
        ]
    }
}


