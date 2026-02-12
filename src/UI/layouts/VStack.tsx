import React from 'react'


export type VStackAlignment = 'leading' | 'center' | 'trailing'
export type VStackWidth = 'auto' | 'full' | number | string

interface VStackProps {
  children: React.ReactNode
  alignment?: VStackAlignment
  spacing?: number
  width?: VStackWidth
  className?: string
  style?: React.CSSProperties
}

const alignmentMap: Record<VStackAlignment, React.CSSProperties['alignItems']> = {
  leading: 'flex-start',
  center: 'center',
  trailing: 'flex-end',
}

export const VStack: React.FC<VStackProps> = ({
  children,
  alignment = 'center',
  spacing = 0,
  width = 'auto',
  className,
  style,
}) => {
  const resolvedWidth = width === 'full' ? '100%' : typeof width === 'number' ? `${width}px` : width

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: alignmentMap[alignment],
        gap: spacing,
        width: resolvedWidth,
        ...style,
      }}
    >
      {children}
    </div>
  )
}
