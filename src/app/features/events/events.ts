//------ Imports ------//
import { Component, inject } from '@angular/core';
import { Event as EventService } from '../../core/services/event';
import { CommonModule } from '@angular/common';
import { EventsCard } from './events-card/events-card';

//------ Component declaration ------//
@Component({
  selector: 'app-events',
  imports: [CommonModule, EventsCard],
  templateUrl: './events.html',
  styleUrl: './events.css',
})
export class Events {
  private eventService = inject(EventService);
  events = this.eventService.events;
}
