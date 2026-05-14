export interface User {
  uid?: string;
  email: string | null;
  role: 'user' | 'admin';
  displayName: string;
  birthDate: string;
  favoriteBook: string;
  hasCompletedQuiz: boolean;
  assignedCharacterId: string;
  photoUrl?: string;
}

export type ProfileUpdateData = Partial<Omit<User, 'uid' | 'email' | 'role' | 'hasCompletedQuiz'>>;
