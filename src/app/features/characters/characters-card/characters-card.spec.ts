import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharactersCard } from './characters-card';

describe('CharactersCard', () => {
  let component: CharactersCard;
  let fixture: ComponentFixture<CharactersCard>;

  const mockCharacter = {
    id: '1',
    name: 'Roland',
    description: 'The Gunslinger',
    image: 'roland.jpg',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharactersCard],
    }).compileComponents();

    fixture = TestBed.createComponent(CharactersCard);

    component = fixture.componentInstance;

    fixture.componentRef.setInput(
      'character',
      mockCharacter
    );

    fixture.detectChanges();

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe recibir el character correctamente', () => {
    expect(component.character()).toEqual(mockCharacter);
  });

  it('debe tener un input character definido', () => {
    expect(component.character).toBeDefined();
  });

  it('renderiza sin errores', () => {
    expect(fixture.nativeElement).toBeTruthy();
  });
});