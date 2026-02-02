import React from 'react'

export type ZStackAlignment =
  | 'topLeading'
  | 'top'
  | 'topTrailing'
  | 'leading'
  | 'center'
  | 'trailing'
  | 'bottomLeading'
  | 'bottom'
  | 'bottomTrailing'

interface ZStackProps {
  children: React.ReactNode
  alignment?: ZStackAlignment
  className?: string
  style?: React.CSSProperties
}

const alignmentMap: Record<ZStackAlignment, React.CSSProperties> = {
  topLeading: { alignItems: 'flex-start', justifyContent: 'flex-start' },
  top: { alignItems: 'center', justifyContent: 'flex-start' },
  topTrailing: { alignItems: 'flex-end', justifyContent: 'flex-start' },
  leading: { alignItems: 'flex-start', justifyContent: 'center' },
  center: { alignItems: 'center', justifyContent: 'center' },
  trailing: { alignItems: 'flex-end', justifyContent: 'center'},
  bottomLeading: { alignItems: 'flex-start', justifyContent: 'flex-end' },
  bottom: { alignItems: 'center', justifyContent: 'flex-end'},
  bottomTrailing: { alignItems: 'flex-end', justifyContent: 'flex-end' },
}

export const ZStack: React.FC<ZStackProps> = ({
  children,
  alignment = 'center',
  className,
  style,
}) => {
  return (
    <div
      className={className}
      style={{
        position: 'relative',
        display: 'flex',
        ...alignmentMap[alignment],
        ...style,
      }}
    >
      {React.Children.map(children, (child) => (
        <div style={{ position: 'absolute', inset: 0 }}>
          {child}
        </div>
      ))}
    </div>
  )
}
