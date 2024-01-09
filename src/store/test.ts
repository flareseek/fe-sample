import { create } from "zustand";

interface TestState {
    count: number;
    increaseCount: () => void;
    setCount: (number: number) => void;
}

export const useTestStore = create<TestState>() ((set) => ({
    count: 0,
    increaseCount: () => set((state) => ({count: state.count + 1})),
    setCount: (number) => set(() => ({count: number}))
}))