import type { HTMLAttributes } from "react"

type StackProps = HTMLAttributes<HTMLDivElement> & {
  grow?: boolean
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
<VStack className="w-12 items-center py-4 bg-bg-container shrink-0">
<VStack className="h-screen overflow-hidden">

<VStack className="h-screen items-center justify-center">
  <LoginForm />
</VStack>

Дополнительно
<VStack role="navigation" aria-label="Sidebar" onClick={...}/>
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




// import React from 'react'


// export type VStackAlignment = 'leading' | 'center' | 'trailing'
// export type VStackWidth = 'auto' | 'full' | number | string

// interface VStackProps {
//   children: React.ReactNode
//   alignment?: VStackAlignment
//   spacing?: number
//   width?: VStackWidth
//   className?: string
//   style?: React.CSSProperties
// }

// const alignmentMap: Record<VStackAlignment, React.CSSProperties['alignItems']> = {
//   leading: 'flex-start',
//   center: 'center',
//   trailing: 'flex-end',
// }

// export const VStack: React.FC<VStackProps> = ({
//   children,
//   alignment = 'center',
//   spacing = 0,
//   width = 'auto',
//   className,
//   style,
// }) => {
//   const resolvedWidth = width === 'full' ? '100%' : typeof width === 'number' ? `${width}px` : width

//   return (
//     <div
//       className={className}
//       style={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: alignmentMap[alignment],
//         gap: spacing,
//         width: resolvedWidth,
//         ...style,
//       }}
//     >
//       {children}
//     </div>
//   )
// }
