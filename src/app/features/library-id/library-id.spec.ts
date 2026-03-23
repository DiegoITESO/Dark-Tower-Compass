import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryId } from './library-id';

describe('LibraryId', () => {
  let component: LibraryId;
  let fixture: ComponentFixture<LibraryId>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryId],
    }).compileComponents();

    fixture = TestBed.createComponent(LibraryId);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
