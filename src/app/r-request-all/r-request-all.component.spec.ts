import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RRequestAllComponent } from './r-request-all.component';

describe('RRequestAllComponent', () => {
  let component: RRequestAllComponent;
  let fixture: ComponentFixture<RRequestAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RRequestAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RRequestAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
