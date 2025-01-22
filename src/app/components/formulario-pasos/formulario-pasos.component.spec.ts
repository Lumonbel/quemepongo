import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioPasosComponent } from './formulario-pasos.component';

describe('FormularioPasosComponent', () => {
  let component: FormularioPasosComponent;
  let fixture: ComponentFixture<FormularioPasosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioPasosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioPasosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
