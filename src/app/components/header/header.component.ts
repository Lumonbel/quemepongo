import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenuComponent,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  mostrarMenu: boolean = false;

  toggleMenu() {
    this.mostrarMenu = !this.mostrarMenu;
  }

}
