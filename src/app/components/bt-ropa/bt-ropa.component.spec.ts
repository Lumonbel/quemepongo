import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtRopaComponent } from './bt-ropa.component';

describe('BtRopaComponent', () => {
  let component: BtRopaComponent;
  let fixture: ComponentFixture<BtRopaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtRopaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtRopaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
