import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenuComponent,CommonModule,RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  mostrarMenu: boolean = false;

  toggleMenu() {
    this.mostrarMenu = !this.mostrarMenu;
  }

}
