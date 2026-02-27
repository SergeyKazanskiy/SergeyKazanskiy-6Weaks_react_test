'use client'

import { useState } from 'react'
import { useEditorStore } from './store'
import { reactFlowToDSL } from '../dsl/reactflowMapper'
import { generateSQL } from '../dsl/sqlGenerator'

export function BottomPanel() {
  const { nodes, edges, startDebug, nextDebug, resetDebug, debugStep } =
    useEditorStore()

  const [inputJson, setInputJson] = useState('{}')

  let sql = ''
  let graph: any = null
  let parsedInput: any = {}

  try {
    graph = reactFlowToDSL({ nodes, edges })
    sql = generateSQL(graph)
    parsedInput = JSON.parse(inputJson)
  } catch (e: any) {
    sql = e.message
  }

  return (
    <div style={{ height: 260, borderTop: '1px solid #ddd', display: 'flex' }}>
      <div style={{ flex: 1 }}>
        <textarea
          value={inputJson}
          onChange={(e) => setInputJson(e.target.value)}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div style={{ flex: 1 }}>
        <pre>{sql}</pre>
      </div>

      <div style={{ flex: 1, padding: 10 }}>
        <button onClick={() => startDebug(graph, parsedInput)}>Start</button>
        <button onClick={nextDebug}>Next</button>
        <button onClick={resetDebug}>Reset</button>

        {debugStep && (
          <pre style={{ maxHeight: 150, overflow: 'auto' }}>
            {JSON.stringify(debugStep.output, null, 2)}
          </pre>
        )}
      </div>
    </div>
  )
}