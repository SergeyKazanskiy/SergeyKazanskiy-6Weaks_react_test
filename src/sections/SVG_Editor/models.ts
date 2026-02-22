export type ElementType = 'symbol' | 'node' | 'template';

export interface LibraryElement {
  id: string;
  name: string;
  type: ElementType;
  parentId?: string; // Для вложенности (node использует symbol)
  primitives: any[]; // Оставим пока any, детально опишем в SidebarRight
  instances?: string[]; // id дочерних элементов
}
