import { create } from 'zustand';

export type BlockType = 'loop' | 'foreach' | 'while' | 'if' | 'ifelse' | 'assign' | 'log' | 'break';

export interface MacroBlock {
  id: string;
  type: BlockType;
  params: Record<string, string>;
  children?: MacroBlock[];
  thenChildren?: MacroBlock[];
  elseChildren?: MacroBlock[];
}

interface MacroState {
  blocks: MacroBlock[];
  addBlock: (type: BlockType, parentId?: string, listKey?: 'children' | 'thenChildren' | 'elseChildren') => void;
  updateParam: (id: string, key: string, value: string) => void;
  deleteBlock: (id: string) => void;
  clear: () => void;
}

export const useMacroStore = create<MacroState>((set) => ({
  blocks: [],

  addBlock: (type, parentId, listKey = 'children') => {
    const newBlock: MacroBlock = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      params: getDefaultParams(type),
      ...(isContainer(type) ? { children: [] } : {}),
      ...(type === 'ifelse' ? { thenChildren: [], elseChildren: [] } : {}),
    };

    set((state) => {
      if (!parentId) return { blocks: [...state.blocks, newBlock] };
      
      const updateRecursive = (list: MacroBlock[]): MacroBlock[] => {
        return list.map((b) => {
          if (b.id === parentId) {
            return { ...b, [listKey]: [...(b[listKey] || []), newBlock] };
          }
          if (b.children) return { ...b, children: updateRecursive(b.children) };
          if (b.thenChildren || b.elseChildren) return {
             ...b, 
             thenChildren: updateRecursive(b.thenChildren || []),
             elseChildren: updateRecursive(b.elseChildren || [])
          };
          return b;
        });
      };
      return { blocks: updateRecursive(state.blocks) };
    });
  },

  updateParam: (id, key, value) => set((state) => {
    const updateRecursive = (list: MacroBlock[]): MacroBlock[] => list.map(b => {
      if (b.id === id) return { ...b, params: { ...b.params, [key]: value } };
      return {
        ...b,
        children: b.children ? updateRecursive(b.children) : undefined,
        thenChildren: b.thenChildren ? updateRecursive(b.thenChildren) : undefined,
        elseChildren: b.elseChildren ? updateRecursive(b.elseChildren) : undefined,
      };
    });
    return { blocks: updateRecursive(state.blocks) };
  }),

  deleteBlock: (id) => set((state) => {
    const filterRecursive = (list: MacroBlock[]): MacroBlock[] => 
      list.filter(b => b.id !== id).map(b => ({
        ...b,
        children: b.children ? filterRecursive(b.children) : undefined,
        thenChildren: b.thenChildren ? filterRecursive(b.thenChildren) : undefined,
        elseChildren: b.elseChildren ? filterRecursive(b.elseChildren) : undefined,
      }));
    return { blocks: filterRecursive(state.blocks) };
  }),

  clear: () => set({ blocks: [] }),
}));

// Вспомогательные функции
function isContainer(type: BlockType) {
  return ['loop', 'foreach', 'while', 'if', 'ifelse'].includes(type);
}

function getDefaultParams(type: BlockType) {
  const defaults: Record<string, Record<string, string>> = {
    loop: { var: 'i', from: '0', to: '10', step: '1' },
    foreach: { array: 'users', item: 'user' },
    if: { cond: 'user.gender === "male"' },
    ifelse: { cond: 'user.age >= 18' },
    assign: { var: 'user.salary', op: '+=', val: '5' },
    log: { msg: '`Updated: ${user.name}`' },
    while: { cond: 'count < 10' },
  };
  return defaults[type] || {};
}