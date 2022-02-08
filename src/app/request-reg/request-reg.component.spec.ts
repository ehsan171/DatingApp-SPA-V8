import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestRegComponent } from './request-reg.component';

describe('RequestRegComponent', () => {
  let component: RequestRegComponent;
  let fixture: ComponentFixture<RequestRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
