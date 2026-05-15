import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Firestore, doc, updateDoc, getDoc, deleteField } from '@angular/fire/firestore';

import { Character } from '../../core/services/character';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quiz.html',
})
export class Quiz implements OnInit {
  private characterService = inject(Character);
  private auth = inject(AuthService);
  private firestore = inject(Firestore);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  hasCompletedQuiz = false;
  isLoading = true;
  selectedCharacter: any = null;
  showReset = false;

  ngOnInit() {
    this.checkDebugMode();
    this.loadUserData();
  }

  private checkDebugMode() {
    this.route.queryParams.subscribe(params => {
      this.showReset = params['debug'] === 'true';
      this.cdr.detectChanges();
    });
  }

  private async loadUserData() {
    const user = this.auth.userSignal();

    if (!user) {
      this.isLoading = false;
      this.cdr.detectChanges();
      return;
    }

    try {
      const userRef = doc(this.firestore, `users/${user.uid}`);
      const snapshot = await getDoc(userRef);

      if (snapshot.exists()) {
        const data = snapshot.data();
        this.hasCompletedQuiz = data['hasCompletedQuiz'] || false;

        if (this.hasCompletedQuiz) {
          this.selectedCharacter = {
            id: data['assignedCharacterId'],
            name: data['assignedCharacterName'],
            image: data['assignedCharacterImage'],
            description: data['assignedCharacterDescription'],
          };
        }
      }
    } catch (error) {
      console.error("Error cargando el destino:", error);
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }

  async onSubmit(form: NgForm) {
    if (this.hasCompletedQuiz) return;

    const characters = this.characterService.characters();
    const user = this.auth.userSignal();

    if (!characters?.length || !user) {
      console.error('Faltan datos para completar el ritual');
      return;
    }

    const randomCharacter = characters[Math.floor(Math.random() * characters.length)];
    this.selectedCharacter = randomCharacter;

    try {
      const userRef = doc(this.firestore, `users/${user.uid}`);
      await updateDoc(userRef, {
        assignedCharacterId: randomCharacter.id,
        assignedCharacterName: randomCharacter.name,// Asegúrate de guardar la imagen también
        assignedCharacterDescription: randomCharacter.description,
        hasCompletedQuiz: true,
      });

      this.hasCompletedQuiz = true;
    } catch (error) {
      console.error("El Ka ha fallado:", error);
    } finally {
      this.cdr.detectChanges();
    }
  }


  goHome() {
    this.router.navigate(['/home']);
  }

  async resetQuiz() {
    const user = this.auth.userSignal();
    if (!user) return;

    this.isLoading = true;
    try {
      const userRef = doc(this.firestore, `users/${user.uid}`);
      await updateDoc(userRef, {
        hasCompletedQuiz: false,
        assignedCharacterId: deleteField(),
        assignedCharacterName: deleteField(),
        assignedCharacterImage: deleteField(),
        assignedCharacterDescription: deleteField()
      });

      this.hasCompletedQuiz = false;
      this.selectedCharacter = null;
      
    } catch (error) {
      console.error("Error al reiniciar el destino:", error);
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }
}