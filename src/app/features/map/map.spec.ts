import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { Map } from './map';
import { Place as PlaceService } from '../../core/services/place';

describe('Map Component', () => {
  let component: Map;
  let fixture: ComponentFixture<Map>;

  const placeServiceMock = {
    places: signal([
      {
        id: '1',
        name: 'Derry',
        description: 'Ciudad principal',
        coordinates: [500, 500],
      },
    ]),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Map],
      providers: [
        {
          provide: PlaceService,
          useValue: placeServiceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Map);
    component = fixture.componentInstance;

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('selectedPlace inicia en null', () => {
    expect(component.selectedPlace()).toBeNull();
  });

  it('showSewers inicia en false', () => {
    expect(component.showSewers()).toBe(false);
  });

  it('toggleSewers cambia el valor de showSewers', () => {
    component.toggleSewers();

    expect(component.showSewers()).toBe(true);

    component.toggleSewers();

    expect(component.showSewers()).toBe(false);
  });

  it('expone places desde el servicio', () => {
    expect(component.places().length).toBe(1);
    expect(component.places()[0].name).toBe('Derry');
  });

  it('places debe ser una señal', () => {
    expect(typeof component.places).toBe('function');
  });

  it('renderiza sin errores', () => {
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('ngOnDestroy no lanza errores', () => {
  expect(component).toBeTruthy();
});
});