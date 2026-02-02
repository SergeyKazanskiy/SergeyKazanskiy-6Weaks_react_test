import React from 'react'


type ScrollSize = 'auto' | 'full' | number | string

interface VScrollProps {
  children: React.ReactNode
  height: ScrollSize
  spacing?: number
  scrollBar?: 'auto' | 'hidden'
  className?: string
  style?: React.CSSProperties
}

const resolveSize = (value?: ScrollSize) => {
  if (!value || value === 'auto') return undefined
  if (value === 'full') return '100%'
  if (typeof value === 'number') return `${value}px`
  return value
}

export const VScroll: React.FC<VScrollProps> = ({
  children,
  height,
  spacing = 0,
  scrollBar = 'auto',
  className,
  style,
}) => {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: spacing,
        height: resolveSize(height),
        overflowY: 'auto',
        overflowX: 'hidden',
        scrollbarWidth: scrollBar === 'hidden' ? 'none' : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  )
}
