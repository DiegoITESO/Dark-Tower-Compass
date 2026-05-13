import { TestBed } from '@angular/core/testing';

import { Places } from '';

describe('Places', () => {
  let service: Places;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Places);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
