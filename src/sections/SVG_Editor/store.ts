import { create } from 'zustand';
import { createSidebarSlice, SidebarSlice } from './states/SidebarSlice';


type Store = SidebarSlice;

export const useStore = create<Store>()((...a) => ({
  ...createSidebarSlice(...a),
}));