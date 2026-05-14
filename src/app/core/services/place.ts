//------ Imports ------//
import { inject, Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { Place as IPlace } from '../models/place.model';

//------ Component declaration ------//
@Injectable({
  providedIn: 'root',
})
export class Place {
  private firestore = inject(Firestore);
  private eventCollection = collection(this.firestore, 'places');
  public places = toSignal(
    collectionData(this.eventCollection, { idField: 'id' }) as Observable<IPlace[]>,
    { initialValue: [] },
  ); // Turn observable into a signal
  constructor() {}
}
