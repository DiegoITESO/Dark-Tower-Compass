import { Component, inject, OnInit } from '@angular/core';
import { Character } from '../../core/services/character';
import { AuthService } from '../../core/services/auth';
import { Firestore, doc, updateDoc, getDoc } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quiz.html',
})
export class Quiz implements OnInit {
  
  hasCompletedQuiz = false;
  isLoading = true;
  selectedCharacter: any = null;

  private characterService = inject(Character);
  private auth = inject(AuthService);
  private firestore = inject(Firestore);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

  goHome() {
    this.router.navigate(['/home']);
  }
  
  async ngOnInit() {
  let user = this.auth.userSignal();

  while (user === undefined) {
    await new Promise(resolve => setTimeout(resolve, 50));
    user = this.auth.userSignal();
  }

  if (!user) {
    this.isLoading = false;
    this.cdr.detectChanges();
    return;
  }

  const userRef = doc(this.firestore, `users/${user.uid}`);
  const snapshot = await getDoc(userRef);

  if (snapshot.exists()) {
    const data: any = snapshot.data();

    this.hasCompletedQuiz = data.hasCompletedQuiz;

    if (data.hasCompletedQuiz) {
      this.selectedCharacter = {
        id: data.assignedCharacterId,
        name: data.assignedCharacterName,
        image: data.assignedCharacterImage,
        description: data.assignedCharacterDescription
      };
    }
  }

  this.isLoading = false;
  this.cdr.detectChanges();
}

  async onSubmit(form: NgForm) {

    if (this.hasCompletedQuiz) {
      console.warn('El usuario ya completó el quiz');
      return;
    }

    const characters = this.characterService.characters();

    if (!characters || characters.length === 0) {
      console.error('No hay personajes disponibles');
      return;
    }

    const randomCharacter =
      characters[Math.floor(Math.random() * characters.length)];

    this.selectedCharacter = randomCharacter;

    const user = this.auth.userSignal();

    if (!user) {
      console.error('Usuario no autenticado');
      return;
    }

    const userRef = doc(this.firestore, `users/${user.uid}`);

    await updateDoc(userRef, {
      assignedCharacterId: randomCharacter.id,
      assignedCharacterName: randomCharacter.name,
      assignedCharacterDescription: randomCharacter.description,
      hasCompletedQuiz: true
    });

    this.hasCompletedQuiz = true;
  }
}