//------ Imports ------//
import { Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Character as ICharacter } from '../../../core/models/character.model';
import { CardUi } from '../../../shared/components/card/card.ui';

//------ Component declaration ------//
@Component({
  selector: 'app-characters-card',
  imports: [CardUi, NgOptimizedImage],
  templateUrl: './characters-card.html',
  styleUrl: './characters-card.css',
})
export class CharactersCard {
  character = input.required<ICharacter>();
}
