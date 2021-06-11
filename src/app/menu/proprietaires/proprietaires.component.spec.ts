import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProprietairesComponent } from './proprietaires.component';

describe('ProprietairesComponent', () => {
  let component: ProprietairesComponent;
  let fixture: ComponentFixture<ProprietairesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProprietairesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProprietairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
