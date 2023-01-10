import { Exercise } from "@models/models";
import create from "zustand";

interface ExerciseState {
  exerciseName?: string;
  exercises: Exercise[];
}

export const useExerciseStore = create<ExerciseState>(() => ({
  exercises: []
}));

export const initializeExercisesStore = (exercises: Exercise[], exerciseName: string) =>
  useExerciseStore.setState(() => ({
    exerciseName,
    exercises
  }));

export const setExercise = (exerciseName: string) => {
  useExerciseStore.setState(() => ({
    exerciseName
  }));
};
