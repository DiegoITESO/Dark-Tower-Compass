import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardUi } from './card.ui';

describe('CardUi', () => {
  let component: CardUi;
  let fixture: ComponentFixture<CardUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardUi],
    }).compileComponents();

    fixture = TestBed.createComponent(CardUi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
