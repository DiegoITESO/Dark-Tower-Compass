import { Component, Input } from '@angular/core';
import { Character as ICharacter } from '../../../shared/types/character';
import { CharacterService } from '../../../shared/services/character';

@Component({
  selector: 'app-characters-card',
  imports: [],
  templateUrl: './characters-card.html',
  styleUrl: './characters-card.css',
})
export class CharactersCard {
  @Input() character: ICharacter = {
    id: '',
    name: '',
    description: '',
    originBook: '',
    mainLocationId: '',
  };
}
