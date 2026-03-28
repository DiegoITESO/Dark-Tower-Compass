import { Component } from '@angular/core';
import { CharacterCard } from '../../shared/components/character-card/character-card';

@Component({
  selector: 'app-home',
  imports: [CharacterCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
