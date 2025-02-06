import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActArtP2Component } from './act-art-p2.component';

describe('ActArtP2Component', () => {
  let component: ActArtP2Component;
  let fixture: ComponentFixture<ActArtP2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActArtP2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActArtP2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
