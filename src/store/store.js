import { create } from "zustand";

const useUserStore = create((set) => ({
  user: {},
  setUser: (newUser) => set({ user: newUser }),
}));

const usePropertyStore = create((set) => ({
  property: {},
  setProperty: (newProperty) => set({ property: newProperty }),
}));

export  {useUserStore, usePropertyStore};