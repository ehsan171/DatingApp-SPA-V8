import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarnameInfoComponent } from './barname-info.component';

describe('BarnameInfoComponent', () => {
  let component: BarnameInfoComponent;
  let fixture: ComponentFixture<BarnameInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarnameInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarnameInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
