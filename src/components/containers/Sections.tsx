//Sections
interface SectionsProps {
  children: React.ReactNode
  className?: string
}

export const Sections: React.FC<SectionsProps> = ({ children, className }) => {
  return (
    <main
      className={className}
      style={{
        height: '100vh',
        overflowY: 'auto',
        scrollSnapType: 'y mandatory', // вертикальный snap
      }}
    >
      {children}
    </main>
  )
}

// Section
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

// Пример использования:
{/* <Sections>
  <Section snap="start">...</Section>
  <Section snap="center">...</Section>
  <Section snap="end">...</Section>
</Sections> */}
