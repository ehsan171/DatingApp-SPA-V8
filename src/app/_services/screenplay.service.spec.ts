/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ScreenplayService } from './screenplay.service';

describe('Service: Screenplay', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScreenplayService]
    });
  });

  it('should ...', inject([ScreenplayService], (service: ScreenplayService) => {
    expect(service).toBeTruthy();
  }));
});
