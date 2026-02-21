import React from 'react'


type ScrollSize = 'auto' | 'full' | number | string

interface HScrollProps {
  children: React.ReactNode
  width: ScrollSize
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

export const HScroll: React.FC<HScrollProps> = ({
  children,
  width,
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
        flexDirection: 'row',
        gap: spacing,
        width: resolveSize(width),
        overflowX: 'auto',
        overflowY: 'hidden',
        scrollbarWidth: scrollBar === 'hidden' ? 'none' : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  )
}
