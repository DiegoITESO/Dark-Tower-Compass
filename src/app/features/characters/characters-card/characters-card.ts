import { Component, input } from '@angular/core';
import { Character as ICharacter } from '../../../core/models/character.model';

@Component({
  selector: 'app-characters-card',
  imports: [],
  templateUrl: './characters-card.html',
  styleUrl: './characters-card.css',
})
export class CharactersCard {
  character = input.required<ICharacter>();
}
