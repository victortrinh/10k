import { Set } from "@models/models";
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

export const addSets = (sets: Set[]) => {
  useSetStore.setState((state) => ({
    sets: [...sets, ...state.sets]
  }));
};
