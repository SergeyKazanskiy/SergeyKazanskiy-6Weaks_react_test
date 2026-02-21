import type { HTMLAttributes } from "react"

type StackProps = HTMLAttributes<HTMLDivElement> & {
  grow?: boolean
}

export function HStack({ grow, className = "", children, ...props }: StackProps) {
  const classes = [
    "flex",
    "flex-row",
    grow && "flex-1",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}

export function VStack({ grow, className = "", children, ...props }: StackProps) {
  const classes = [
    "flex",
    "flex-col",
    grow && "flex-1",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}


//
/*
<HStack className="gap-2 flex-wrap">
  {tags.map(tag => (
    <Tag key={tag} label={tag} />
  ))}
</HStack>

<HStack className="justify-between items-center">
  <h2>Projects</h2>
  <Button className="btn-primary btn-sm">New</Button>
</HStack>

<HStack grow className="overflow-hidden" />
*/






// import React from 'react'


// export type HStackAlignment = 'top' | 'center' | 'bottom'
// export type StackSize = 'auto' | 'full' | number | string

// interface HStackProps {
//   children: React.ReactNode
//   alignment?: HStackAlignment
//   spacing?: number
//   width?: StackSize
//   height?: StackSize
//   className?: string
//   style?: React.CSSProperties
// }

// const alignmentMap: Record<HStackAlignment, React.CSSProperties['alignItems']> = {
//   top: 'flex-start',
//   center: 'center',
//   bottom: 'flex-end',
// }

// const resolveSize = (value?: StackSize) => {
//   if (!value || value === 'auto') return undefined
//   if (value === 'full') return '100%'
//   if (typeof value === 'number') return `${value}px`
//   return value
// }

// export const HStack: React.FC<HStackProps> = ({
//   children,
//   alignment = 'center',
//   spacing = 0,
//   width = 'auto',
//   height = 'auto',
//   className,
//   style,
// }) => {
//   return (
//     <div
//       className={className}
//       style={{
//         display: 'flex',
//         flexDirection: 'row',
//         alignItems: alignmentMap[alignment],
//         gap: spacing,
//         width: resolveSize(width),
//         height: resolveSize(height),
//         ...style,
//       }}
//     >
//       {children}
//     </div>
//   )
// }


