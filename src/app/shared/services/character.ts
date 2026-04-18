import { Injectable } from '@angular/core';
import { Character as ICharacter } from '../types/character';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  constructor(private firestore: Firestore) {} 

  getCharacters(): Observable<ICharacter[]> {
    const charactersRef = collection(this.firestore, 'characters');
    return collectionData(charactersRef, { idField: 'id' }) as Observable<ICharacter[]>;
  }
}