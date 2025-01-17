import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CajoneraComponent } from './cajonera.component';

describe('CajoneraComponent', () => {
  let component: CajoneraComponent;
  let fixture: ComponentFixture<CajoneraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CajoneraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CajoneraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
