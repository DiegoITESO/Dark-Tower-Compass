//------ Imports ------//
import { Component } from '@angular/core';
import { CardUi } from '../../shared/components/card/card.ui';

//------ Injectable decorator ------//
@Component({
  selector: 'app-home',
  imports: [CardUi],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
//------ Service Auth ------//
export class Home {}
