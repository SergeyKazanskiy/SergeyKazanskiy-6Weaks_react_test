import React from 'react'


type GridAlign = 'start' | 'center' | 'end' | 'stretch'

interface GridProps {
  children: React.ReactNode
  columns?: number
  minItemWidth?: number
  gap?: number
  align?: GridAlign
  className?: string
  style?: React.CSSProperties
}

const alignMap: Record<GridAlign, React.CSSProperties['alignItems']> = {
  start: 'start',
  center: 'center',
  end: 'end',
  stretch: 'stretch',
}

export const Grid: React.FC<GridProps> = ({
  children,
  columns,
  minItemWidth,
  gap = 0,
  align = 'stretch',
  className,
  style,
}) => {
  // Контракт: либо columns, либо minItemWidth
  if (process.env.NODE_ENV !== 'production') {
    if (!columns && !minItemWidth) {
      console.warn(
        'Grid: either "columns" or "minItemWidth" should be provided'
      )
    }
  }

  const gridTemplateColumns = columns
    ? `repeat(${columns}, minmax(0, 1fr))`
    : minItemWidth
    ? `repeat(auto-fit, minmax(${minItemWidth}px, 1fr))`
    : undefined

  return (
    <div
      className={className}
      style={{
        display: 'grid',
        gridTemplateColumns,
        gap,
        alignItems: alignMap[align],
        ...style,
      }}
    >
      {children}
    </div>
  )
}
