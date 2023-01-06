import create from "zustand";
import { Set } from "../models";

interface SetState {
  sets: Set[];
}

export const useSetStore = create<SetState>((set) => ({
  sets: [],
}));

export const initializeSetStore = (sets: Set[]) =>
  useSetStore.setState(() => ({
    sets,
  }));

export const addSet = (set: Set) => {
  useSetStore.setState((state) => ({
    sets: [...state.sets, set],
  }));
};
