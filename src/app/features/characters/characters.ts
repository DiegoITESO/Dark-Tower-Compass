import { Component, inject } from '@angular/core';
import { Character as CharacterService } from '../../core/services/character';
import { CommonModule } from '@angular/common';
import { CharactersCard } from './characters-card/characters-card';

@Component({
  selector: 'app-characters',
  imports: [CommonModule, CharactersCard],
  templateUrl: './characters.html',
  styleUrl: './characters.css',
})
export class Characters {
  private charService = inject(CharacterService);
  characters = this.charService.characters;
}
