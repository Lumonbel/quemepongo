import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerprendaComponent } from './verprenda.component';

describe('VerprendaComponent', () => {
  let component: VerprendaComponent;
  let fixture: ComponentFixture<VerprendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerprendaComponent]
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
