import { cn } from '@/lib/utils'
import { type VariantProps, cva } from 'class-variance-authority'
import { Hash } from 'lucide-react'
import * as React from 'react'

const badgeVariants = cva(
  'inline-flex items-center rounded border px-2.5 py-0.5 text-xs transition-colors focus:outline-none focus:ring focus:ring-ring',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-orange-50 text-primary-foreground shadow hover:bg-orange/80',
        secondary:
          'border-transparent bg-orange-50 text-secondary-foreground hover:bg-orange/80',
        destructive:
          'border-transparent bg-orange-50 text-destructive-foreground shadow hover:bg-destructive/80',
        outline: 'text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  showHash?: boolean
}

function Badge({ className, variant, showHash = true, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {showHash && <Hash className="size-3 -translate-x-0.5" />}
      {props.children}
    </div>
  )
}

export { Badge, badgeVariants }
