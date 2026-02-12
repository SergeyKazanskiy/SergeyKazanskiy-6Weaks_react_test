import React from 'react'

type ContainerSize = 'auto' | 'full' | number | string

interface ContainerProps {
  children: React.ReactNode

  // Размеры
  width?: ContainerSize
  height?: ContainerSize

  // Tailwind-style props
  padding?: string
  background?: string
  border?: string
  shadow?: string
  blur?: string
  rotate?: string

  className?: string
  style?: React.CSSProperties
}

const resolveSize = (value?: ContainerSize) => {
  if (!value || value === 'auto') return undefined
  if (value === 'full') return '100%'
  if (typeof value === 'number') return `${value}px`
  return value
}

export const Container: React.FC<ContainerProps> = ({ children,
  width,
  height,
  padding,
  background,
  border,
  shadow,
  blur,
  rotate,
  className,
  style,
}) => {
  return (
    <div
      className={[
        padding,
        background,
        border,
        shadow,
        blur,
        rotate,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        width: resolveSize(width),
        height: resolveSize(height),
        ...style,
      }}
    >
      {children}
    </div>
  )
}
