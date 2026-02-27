'use client'

import ReactFlow, { ReactFlowProvider, Background, Controls } from 'reactflow'
import 'reactflow/dist/style.css'

import { useEditorStore } from './store'
import { NodePalette } from './NodePalette'
import { PropertiesPanel } from './PropertiesPanel'
import { BottomPanel } from './BottomPanel'
import { nodeTypes } from './nodeTypes'

export function Editor() {
  return (
    <ReactFlowProvider>
      <EditorInner />
    </ReactFlowProvider>
  )
}

function EditorInner() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setSelectedNode,
    selectedNodeId,
    activeNodeId
  } = useEditorStore()

  const highlightedNodes = nodes.map(n => ({
    ...n,
    style:
      n.id === activeNodeId
        ? { border: '2px solid red' }
        : {}
  }))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ flex: 1, display: 'flex' }}>
        <NodePalette />

        <div style={{ flex: 1 }}>
          <ReactFlow
            nodes={highlightedNodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={(_, node) => setSelectedNode(node.id)}
            nodeTypes={nodeTypes}
            fitView
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>

        <PropertiesPanel />
      </div>

      <BottomPanel />
    </div>
  )
}