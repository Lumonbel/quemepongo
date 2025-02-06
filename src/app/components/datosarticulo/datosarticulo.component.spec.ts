import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosarticuloComponent } from './datosarticulo.component';

describe('DatosarticuloComponent', () => {
  let component: DatosarticuloComponent;
  let fixture: ComponentFixture<DatosarticuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosarticuloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosarticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
