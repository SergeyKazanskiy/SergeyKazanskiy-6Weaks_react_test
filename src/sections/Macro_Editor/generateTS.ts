// function generateTS(blocks: MacroBlock[], indent = 0): string {
//     const space = '  '.repeat(indent);
//     return blocks.map(b => {
//       const p = b.params;
//       switch (b.type) {
//         case 'loop':
//           return `${space}for (let ${p.var} = ${p.from}; ${p.var} < ${p.to}; ${p.var} += ${p.step}) {\n${generateTS(b.children || [], indent + 1)}\n${space}}`;
//         case 'foreach':
//           return `${space}for (const ${p.item} of ${p.array}) {\n${generateTS(b.children || [], indent + 1)}\n${space}}`;
//         case 'if':
//           return `${space}if (${p.cond}) {\n${generateTS(b.children || [], indent + 1)}\n${space}}`;
//         case 'assign':
//           return `${space}${p.var} ${p.op} ${p.val};`;
//         case 'log':
//           return `${space}console.log(${p.msg});`;
//         default:
//           return '';
//       }
//     }).join('\n');
//   }