//------ Imports ------//
import { inject, Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { Event as IEvent } from '../models/event.model';

//------ Component declaration ------//
@Injectable({
  providedIn: 'root',
})
export class Event {
  private firestore = inject(Firestore);
  private eventCollection = collection(this.firestore, 'events');
  public events = toSignal(
    collectionData(this.eventCollection, { idField: 'id' }) as Observable<IEvent[]>,
    { initialValue: [] },
  ); // Turn observable into a signal
  constructor() {}
}
