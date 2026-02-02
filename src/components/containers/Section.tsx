type SnapPosition = 'start' | 'center' | 'end'

interface SectionProps {
  children: React.ReactNode
  snap?: SnapPosition
  className?: string
  style?: React.CSSProperties
}

export const Section: React.FC<SectionProps> = ({
  children,
  snap = 'start',
  className,
  style,
}) => {
  return (
    <section
      className={className}
      style={{
        scrollSnapAlign: snap,
        minHeight: '100vh', // секция занимает весь экран
        ...style,
      }}
    >
      {children}
    </section>
  )
}
