import { Component, OnInit, signal } from '@angular/core';
import { Character as ICharacter } from '../../shared/types/character';
import { CommonModule } from '@angular/common';
import { CharacterService } from '../../shared/services/character';
import { CharactersCard } from './characters-card/characters-card';

@Component({
  selector: 'app-characters',
  imports: [CommonModule, CharactersCard],
  templateUrl: './characters.html',
  styleUrl: './characters.css',
})
export class Characters implements OnInit {
  characters = signal<ICharacter[]>([]);

  constructor(private characterService: CharacterService) {}

  ngOnInit(): void {
    this.getCharacters();
  }

  getCharacters() {
    this.characterService.getCharacters().subscribe(response => {
      this.characters.set(response);
    });
  }
}