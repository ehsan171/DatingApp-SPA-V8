import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RRequestComponent } from './r-request.component';

describe('RRequestComponent', () => {
  let component: RRequestComponent;
  let fixture: ComponentFixture<RRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
