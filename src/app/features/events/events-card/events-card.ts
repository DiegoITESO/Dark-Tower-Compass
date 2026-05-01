//------ Imports ------//
import { Component, input } from '@angular/core';
import { CardUi } from '../../../shared/components/card/card.ui';
import { Event as IEvent } from '../../../core/models/event.model'

//------ Component declaration ------//
@Component({
  selector: 'app-events-card',
  imports: [CardUi],
  templateUrl: './events-card.html',
  styleUrl: './events-card.css',
})
export class EventsCard {
  event = input.required<IEvent>();
}
