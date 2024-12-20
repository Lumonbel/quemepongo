import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentepruebaComponent } from './componenteprueba.component';

describe('ComponentepruebaComponent', () => {
  let component: ComponentepruebaComponent;
  let fixture: ComponentFixture<ComponentepruebaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentepruebaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentepruebaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
