import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "relative inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:pointer-events-none disabled:opacity-50 overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "btn-glow text-white",
        destructive:
          "bg-gradient-to-br from-destructive to-accent-deep text-white shadow-[0_8px_24px_rgba(255,17,51,0.30)] hover:shadow-[0_12px_32px_rgba(255,17,51,0.45)] hover:-translate-y-0.5",
        outline:
          "border border-white/15 bg-white/5 backdrop-blur-md text-white hover:bg-white/10 hover:border-accent/40 hover:shadow-[0_0_24px_rgba(255,42,61,0.25)]",
        secondary:
          "bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10",
        ghost:
          "hover:bg-white/5 hover:text-accent text-white/80",
        link:
          "text-accent underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 rounded-full px-4 text-xs",
        lg: "h-12 rounded-full px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    (<Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />)
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
