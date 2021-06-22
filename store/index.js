import create from 'zustand';
import en from '../assets/lang/en.json';
import nl from '../assets/lang/en.json';

export const useStore = create((set) => ({
  user: undefined,
  selectedLanguage: en,
  setSelectedLanguage: (data) => set({selectedLanguage: data}),
  setUser: (data) => set({user: data}),
}));
