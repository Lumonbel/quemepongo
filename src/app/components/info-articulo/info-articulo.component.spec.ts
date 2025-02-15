import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoArticuloComponent } from './info-articulo.component';

describe('InfoArticuloComponent', () => {
  let component: InfoArticuloComponent;
  let fixture: ComponentFixture<InfoArticuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoArticuloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
