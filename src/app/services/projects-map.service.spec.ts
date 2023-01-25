import { TestBed } from '@angular/core/testing';

import { ProjectsMapService } from './projects-map.service';

describe('ProjectsMapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjectsMapService = TestBed.get(ProjectsMapService);
    expect(service).toBeTruthy();
  });
});
