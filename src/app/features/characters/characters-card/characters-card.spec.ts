import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharactersCard } from './characters-card';

describe('CharactersCard', () => {
  let component: CharactersCard;
  let fixture: ComponentFixture<CharactersCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharactersCard],
    }).compileComponents();

    fixture = TestBed.createComponent(CharactersCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
