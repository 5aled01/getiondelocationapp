import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmobilierBatiComponent } from './immobilierBati.component';

describe('ImmobilierBatiComponent', () => {
  let component: ImmobilierBatiComponent;
  let fixture: ComponentFixture<ImmobilierBatiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImmobilierBatiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImmobilierBatiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
