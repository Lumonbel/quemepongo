import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialesComponent } from './historiales.component';

describe('HistorialesComponent', () => {
  let component: HistorialesComponent;
  let fixture: ComponentFixture<HistorialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
