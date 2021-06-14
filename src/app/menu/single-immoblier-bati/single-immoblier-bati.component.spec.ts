import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleImmoblierBatiComponent } from './single-immoblier-bati.component';

describe('SingleImmoblierBatiComponent', () => {
  let component: SingleImmoblierBatiComponent;
  let fixture: ComponentFixture<SingleImmoblierBatiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleImmoblierBatiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleImmoblierBatiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
