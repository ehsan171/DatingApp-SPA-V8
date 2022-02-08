import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceRegComponent } from './resource-reg.component';

describe('ResourceRegComponent', () => {
  let component: ResourceRegComponent;
  let fixture: ComponentFixture<ResourceRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
