import create from 'zustand';

export const useStore = create((set) => ({
  user: undefined,
  setUser: (data) => set({user: data}),
}));
