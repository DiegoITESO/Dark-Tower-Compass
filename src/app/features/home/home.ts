//------ Imports ------//
import { Component } from '@angular/core';
import { CharacterCard } from '../../shared/components/character-card/character-card';

//------ Injectable decorator ------//
@Component({
  selector: 'app-home',
  imports: [CharacterCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
//------ Service Auth ------//
export class Home {}
