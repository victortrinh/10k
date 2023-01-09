import { Set } from "../models";
import create from "zustand";

interface SetState {
  sets: Set[];
}

export const useSetStore = create<SetState>(() => ({
  sets: []
}));

export const initializeSetStore = (sets: Set[]) =>
  useSetStore.setState(() => ({
    sets
  }));

export const addSet = (set: Set) => {
  useSetStore.setState((state) => ({
    sets: [...state.sets, set]
  }));
};
