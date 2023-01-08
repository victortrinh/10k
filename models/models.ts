export interface Set {
  id: string;
  createdAt: string;
  reps: number;
  user: User;
  userId: string;
  exercise: Exercise;
  exerciseId: string;
}

export interface User {
  id: string;
  name: string;
  imageUrl?: string;
  color: string;
  sets: Set[];
}

export interface Exercise {
  id: string;
  name: ExerciseName;
  sets: Set[];
}

export type ExerciseName = "Pull ups" | "Push ups" | "Squats";
