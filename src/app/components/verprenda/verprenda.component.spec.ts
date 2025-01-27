import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BtAtrasComponent } from '../bt-atras/bt-atras.component';

import { VerprendaComponent } from './verprenda.component';

describe('VerprendaComponent', () => {
  let component: VerprendaComponent;
  let fixture: ComponentFixture<VerprendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerprendaComponent, BtAtrasComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(VerprendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
