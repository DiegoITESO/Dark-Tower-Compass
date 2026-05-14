import { Component, input, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Events } from './events';
import { Event as EventService } from '../../core/services/event';
import { EventsCard } from './events-card/events-card';

@Component({
  selector: 'app-events-card',
  standalone: true,
  template: '',
})
class MockEventsCard {
  event = input.required<any>();
}

describe('Events Component', () => {
  let component: Events;
  let fixture: ComponentFixture<Events>;

  const mockEvents = [
    {
      id: '1',
      title: 'Battle of Jericho Hill',
    },
  ];

  const eventServiceMock = {
    events: signal(mockEvents),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Events],
      providers: [
        {
          provide: EventService,
          useValue: eventServiceMock,
        },
      ],
    })
      .overrideComponent(Events, {
        remove: {
          imports: [EventsCard],
        },
        add: {
          imports: [MockEventsCard],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(Events);
    component = fixture.componentInstance;

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('expone events desde el servicio', () => {
    expect(component.events()).toEqual(mockEvents);
  });

  it('events debe ser una señal', () => {
    expect(typeof component.events).toBe('function');
  });

  it('renderiza sin errores', () => {
    expect(fixture.nativeElement).toBeTruthy();
  });
});