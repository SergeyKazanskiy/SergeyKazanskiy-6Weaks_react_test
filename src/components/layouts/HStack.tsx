import React from 'react'


export type HStackAlignment = 'top' | 'center' | 'bottom'
export type StackSize = 'auto' | 'full' | number | string

interface HStackProps {
  children: React.ReactNode
  alignment?: HStackAlignment
  spacing?: number
  width?: StackSize
  height?: StackSize
  className?: string
  style?: React.CSSProperties
}

const alignmentMap: Record<HStackAlignment, React.CSSProperties['alignItems']> = {
  top: 'flex-start',
  center: 'center',
  bottom: 'flex-end',
}

const resolveSize = (value?: StackSize) => {
  if (!value || value === 'auto') return undefined
  if (value === 'full') return '100%'
  if (typeof value === 'number') return `${value}px`
  return value
}

export const HStack: React.FC<HStackProps> = ({
  children,
  alignment = 'center',
  spacing = 0,
  width = 'auto',
  height = 'auto',
  className,
  style,
}) => {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: alignmentMap[alignment],
        gap: spacing,
        width: resolveSize(width),
        height: resolveSize(height),
        ...style,
      }}
    >
      {children}
    </div>
  )
}
