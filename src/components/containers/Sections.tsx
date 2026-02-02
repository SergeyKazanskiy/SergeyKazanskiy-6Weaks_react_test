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

{/* <Sections>
  <Section snap="start">...</Section>
  <Section snap="center">...</Section>
  <Section snap="end">...</Section>
</Sections> */}
