import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeamhealthComponent } from './seamhealth.component';

describe('SeamhealthComponent', () => {
  let component: SeamhealthComponent;
  let fixture: ComponentFixture<SeamhealthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeamhealthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeamhealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
