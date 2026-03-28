import { Component, input } from '@angular/core';

@Component({
  selector: 'app-character-card',
  imports: [],
  templateUrl: './character-card.html',
  styleUrl: './character-card.css',
})
export class CharacterCard {
  name = input('Nombre del Personaje');
  role = input('Pistolero / Habitante');
  description = input('Descripción breve...');
  imageUrl = input('https://via.placeholder.com/150');
}
