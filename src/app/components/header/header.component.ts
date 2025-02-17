import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AlertService } from '../../services/alerts.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenuComponent,CommonModule,RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent{
  mostrarMenu: boolean = false;
  constructor(private router: Router,
    private alertService: AlertService
  ) {}

  toggleMenu() {
    this.mostrarMenu = !this.mostrarMenu;
  }

  togglePerfil(){
    if(localStorage.getItem('nombreUsuario') !== null){
      this.router.navigate(['/perfilCliente']); 
    }else{
      this.router.navigate(['/login']);
    }
  }
  toggleCesta(){
    if(localStorage.getItem('nombreUsuario') !== null){
      this.router.navigate(['/cesta']);
    }else{
      this.alertService.confirm(
        '¿Usted tiene cuenta?',
        ``,
        'Sí',
        'No'
      ).then((confirmed) => {
        if (confirmed) {
           this.router.navigate(['/login']);
        }else{
          this.router.navigate(['/registroPasos']);
        }
      }); 
    }
  }

}
