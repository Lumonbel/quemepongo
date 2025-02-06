import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPerfilClienteComponent } from './ver-perfil-cliente.component';

describe('VerPerfilClienteComponent', () => {
  let component: VerPerfilClienteComponent;
  let fixture: ComponentFixture<VerPerfilClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerPerfilClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerPerfilClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
