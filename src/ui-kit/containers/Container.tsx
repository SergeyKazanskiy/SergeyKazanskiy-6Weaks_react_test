import type { ReactNode, CSSProperties } from 'react'

type ContainerSize = 'auto' | 'full' | number | string

interface ContainerProps {
  children: ReactNode
  w?: ContainerSize
  h?: ContainerSize

  // Tailwind-style props
  p?: string
  bg?: string
  br?: string
  sh?: string
  bl?: string
}

const resolveSize = (value?: ContainerSize) => {
  if (!value || value === 'auto') return undefined
  if (value === 'full') return '100%'
  if (typeof value === 'number') return `${value}px`
  return value
}

export const Container: React.FC<ContainerProps> = ({ children, w, h, p, bg, br, sh, bl }) => {
  return (
    <div
      className={[p, bg, br, sh, bl].filter(Boolean).join(' ')}
      style={{ width: resolveSize(w), height: resolveSize(h) }}
    >
      {children}
    </div>
  )
}
