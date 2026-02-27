// const RenderBlock: React.FC<{ block: MacroBlock }> = ({ block }) => {
//     const { updateParam, deleteBlock, addBlock } = useMacroStore();
  
//     const handleDrop = (e: React.DragEvent, key: any) => {
//       e.preventDefault();
//       e.stopPropagation();
//       const type = e.dataTransfer.getData('type') as BlockType;
//       addBlock(type, block.id, key);
//     };
  
//     return (
//       <div style={{ ...styles.block, borderLeftColor: getBlockColor(block.type) }}>
//         <div style={styles.blockHeader}>
//           <span style={styles.badge}>{block.type.toUpperCase()}</span>
//           <button onClick={() => deleteBlock(block.id)} style={styles.delBtn}>×</button>
//         </div>
        
//         <div style={styles.blockBody}>
//           {/* Динамические инпуты в зависимости от типа */}
//           {Object.keys(block.params).map(key => (
//             <input 
//               key={key}
//               value={block.params[key]}
//               onChange={e => updateParam(block.id, key, e.target.value)}
//               style={styles.input}
//               placeholder={key}
//             />
//           ))}
  
//           {/* Вложенные области */}
//           {block.type === 'ifelse' ? (
//             <>
//               <div style={styles.nestedLabel}>Если (Then)</div>
//               <div style={styles.nestedZone} onDrop={e => handleDrop(e, 'thenChildren')} onDragOver={e => e.preventDefault()}>
//                 {block.thenChildren?.map(b => <RenderBlock key={b.id} block={b} />)}
//               </div>
//               <div style={styles.nestedLabel}>Иначе (Else)</div>
//               <div style={styles.nestedZone} onDrop={e => handleDrop(e, 'elseChildren')} onDragOver={e => e.preventDefault()}>
//                 {block.elseChildren?.map(b => <RenderBlock key={b.id} block={b} />)}
//               </div>
//             </>
//           ) : block.children && (
//             <div style={styles.nestedZone} onDrop={e => handleDrop(e, 'children')} onDragOver={e => e.preventDefault()}>
//               {block.children.map(b => <RenderBlock key={b.id} block={b} />)}
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };