import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventsCard } from './events-card';

describe('EventsCard Component', () => {
  let component: EventsCard;
  let fixture: ComponentFixture<EventsCard>;

  const mockEvent = {
    id: '1',
    name: 'The Stand',
    description: 'Evento importante',
    originBook: 'The Stand',
    mainLocationId: 'Mid-World',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsCard],
    }).compileComponents();

    fixture = TestBed.createComponent(EventsCard);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('event', mockEvent);

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe recibir el input event correctamente', () => {
    expect(component.event()).toEqual(mockEvent);
  });

  it('event debe ser una señal/input function', () => {
    expect(typeof component.event).toBe('function');
  });

  it('renderiza sin errores', () => {
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('mantiene el nombre del evento', () => {
    expect(component.event().name).toBe('The Stand');
  });
});