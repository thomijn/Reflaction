import create from 'zustand';

export const useStore = create((set) => ({
  user: undefined,
  selectedLanguage: 'NL',
  setSelectedLanguage: (data) => set({selectedLanguage: data}),
  setUser: (data) => set({user: data}),
}));
