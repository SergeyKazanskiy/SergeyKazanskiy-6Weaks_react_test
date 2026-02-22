import { StateCreator } from 'zustand';
import { LibraryElement } from '../models';


export interface SidebarSlice {
  symbols: LibraryElement[];
  nodes: LibraryElement[];
  templates: LibraryElement[];
  activeElementId: string | null;

  addElement: (type: 'symbols' | 'nodes' | 'templates', element: LibraryElement) => void;
  copyElement: (id: string) => void;
  selectElement: (id: string | null) => void;
}

export const createSidebarSlice: StateCreator<SidebarSlice> = (set, get) => ({
  symbols: [
    { id: 'res_1', name: 'Резистор', type: 'symbol', primitives: [] },
    { id: 'cap_1', name: 'Конденсатор', type: 'symbol', primitives: [] }
  ],
  nodes: [],
  templates: [],
  activeElementId: null,

  selectElement: (id) => set({ activeElementId: id }),

  addElement: (group, element) => set((state) => ({
    [group]: [...state[group], element]
  })),

  copyElement: (id) => {
    const state = get();
    // Ищем элемент во всех группах
    const all = [...state.symbols, ...state.nodes, ...state.templates];
    const original = all.find(el => el.id === id);
    
    if (original) {
      const copy = { 
        ...original, 
        id: `${original.id}_copy_${Date.now()}`,
        name: `${original.name} (копия)` 
      };
      // Добавляем в ту же группу, к которой принадлежал оригинал
      const groupKey = (original.type + 's') as 'symbols' | 'nodes' | 'templates';
      state.addElement(groupKey, copy);
    }
  }
});