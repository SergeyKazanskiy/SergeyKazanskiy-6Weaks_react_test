// import React, { useMemo } from 'react';
// import { useMacroStore, MacroBlock, BlockType } from './useMacroStore';

// export const MacroBuilder: React.FC = () => {
//   const { blocks, addBlock, clear } = useMacroStore();
  
//   const generatedCode = useMemo(() => {
//     return generateTS(blocks);
//   }, [blocks]);

//   return (
//     <div style={styles.container}>
//       {/* Sidebar */}
//       <div style={styles.sidebar}>
//         <h3>Инструменты</h3>
//         <ToolButton label="Цикл For" type="loop" icon="🔁" />
//         <ToolButton label="Цикл ForEach" type="foreach" icon="📋" />
//         <ToolButton label="Если (If)" type="if" icon="❓" />
//         <ToolButton label="Присвоение" type="assign" icon="✏️" />
//         <ToolButton label="Лог" type="log" icon="📝" />
//         <button onClick={clear} style={styles.clearBtn}>Очистить всё</button>
//       </div>

//       {/* Canvas */}
//       <div style={styles.canvas}>
//         <div style={styles.dropZone} onDragOver={e => e.preventDefault()} onDrop={e => {
//           const type = e.dataTransfer.getData('type') as BlockType;
//           addBlock(type);
//         }}>
//           {blocks.length === 0 && <p>Перетащите блоки сюда</p>}
//           {blocks.map(block => <RenderBlock key={block.id} block={block} />)}
//         </div>
//       </div>

//       {/* Code Preview */}
//       <div style={styles.codePanel}>
//         <div style={styles.codeHeader}>TypeScript Output</div>
//         <pre style={styles.pre}><code>{generatedCode}</code></pre>
//       </div>
//     </div>
//   );
// };

// const ToolButton = ({ label, type, icon }: { label: string, type: BlockType, icon: string }) => (
//   <div 
//     draggable 
//     onDragStart={e => e.dataTransfer.setData('type', type)}
//     style={styles.toolItem}
//   >
//     <span>{icon}</span> {label}
//   </div>
// );