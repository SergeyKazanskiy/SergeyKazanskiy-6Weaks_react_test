import React from 'react';
import { useStore } from '../store';
import { LibraryElement } from '../models';

export const ComponentList: React.FC = () => {
  const { symbols, nodes, templates, activeElementId, selectElement, copyElement } = useStore();

  const renderGroup = (title: string, items: LibraryElement[]) => (
    <div className="mb-4">
      <h3 className="font-bold border-b pb-1 mb-2">{title}</h3>
      <ul className="pl-2">
        {items.map((item) => (
          <li 
            key={item.id}
            className={`cursor-pointer p-1 hover:bg-blue-100 flex justify-between items-center ${
              activeElementId === item.id ? 'bg-blue-200' : ''
            }`}
            onClick={() => selectElement(activeElementId === item.id ? null : item.id)}
          >
            <span>{item.name}</span>
            <button 
              onClick={(e) => { e.stopPropagation(); copyElement(item.id); }}
              className="text-xs bg-gray-300 px-1 rounded hover:bg-gray-400"
            >
              Копия
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="w-64 border-r h-full p-4 overflow-y-auto bg-gray-50">
      {renderGroup("1. Компоненты (Symbols)", symbols)}
      {renderGroup("2. Узлы (Nodes)", nodes)}
      {renderGroup("3. Макеты (Templates)", templates)}
    </div>
  );
};