import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalsComponent } from './detals.component';

describe('DetalsComponent', () => {
  let component: DetalsComponent;
  let fixture: ComponentFixture<DetalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
