//------ Imports ------//
import { Component } from '@angular/core';
import { LibraryId } from './library-id/library-id';

//------ Component declaration ------//
@Component({
  selector: 'app-profile',
  imports: [LibraryId],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {}
