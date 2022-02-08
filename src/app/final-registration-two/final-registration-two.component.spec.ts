import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalRegistrationTwoComponent } from './final-registration-two.component';

describe('FinalRegistrationTwoComponent', () => {
  let component: FinalRegistrationTwoComponent;
  let fixture: ComponentFixture<FinalRegistrationTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalRegistrationTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalRegistrationTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
