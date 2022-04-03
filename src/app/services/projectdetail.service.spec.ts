import { TestBed } from '@angular/core/testing';

import { ProjectdetailService } from './projectdetail.service';

describe('ProjectdetailService', () => {
  let service: ProjectdetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectdetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
