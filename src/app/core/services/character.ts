//------ Imports ------//
import { inject, Injectable } from '@angular/core';
import { Character as ICharacter } from '../models/character.model';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

//------ Component declaration ------//
@Injectable({
  providedIn: 'root',
})
export class Character {
  private firestore = inject(Firestore);
  private charCollection = collection(this.firestore, 'characters');
  public characters = toSignal(
    collectionData(this.charCollection, { idField: 'id' }) as Observable<ICharacter[]>,
    { initialValue: [] },
  ); // Turn the observable into a signal
  constructor() {}
}
