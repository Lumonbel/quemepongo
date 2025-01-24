import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtAtrasComponent } from './bt-atras.component';

describe('BtAtrasComponent', () => {
  let component: BtAtrasComponent;
  let fixture: ComponentFixture<BtAtrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtAtrasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtAtrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
