'use client'

import { useEditorStore } from './store'
import { NODE_SCHEMAS } from './nodeSchema'

export function PropertiesPanel() {
  const { nodes, selectedNodeId, setNodes } = useEditorStore()

  const node = nodes.find(n => n.id === selectedNodeId)

  if (!node) return <div style={{ width: 300 }}>Select node</div>

  const schema = NODE_SCHEMAS[node.type]

  const update = (key: string, value: any) => {
    setNodes(
      nodes.map(n =>
        n.id === node.id
          ? { ...n, data: { ...n.data, [key]: value } }
          : n
      )
    )
  }

  return (
    <div style={{ width: 300, padding: 10 }}>
      <h3>{schema.label}</h3>

      {Object.entries(schema.fields).map(([key, field]) => (
        <div key={key}>
          <label>{field.label}</label>
          <input
            value={node.data?.[key] || ''}
            onChange={(e) => update(key, e.target.value)}
          />
        </div>
      ))}
    </div>
  )
}