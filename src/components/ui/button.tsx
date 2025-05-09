import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-yellow-400 text-black hover:bg-yellow-400/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        specialAction: "bg-yellow-400 text-black hover:bg-yellow-400/90 active:bg-yellow-400 disabled:bg-yellow-400/50 disabled:text-black share:bg-yellow-400 points:bg-yellow-400/90",
        reflink: "bg-yellow-400 text-black hover:bg-yellow-400/90"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

// Outlaw theme button styles
export function Button({ className, variant = "default", ...props }: ButtonProps) {
  let outlawClass =
    "font-extrabold uppercase tracking-wider rounded-lg transition-all duration-200 shadow-md focus:ring-2 focus:ring-amber-500 focus:ring-offset-2";

  if (variant === "default") {
    outlawClass +=
      " bg-gradient-to-br from-black via-gray-900 to-black border-2 border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-black hover:shadow-[0_0_20px_4px_rgba(245,158,11,0.4)] active:bg-amber-600 active:text-black";
  } else if (variant === "secondary") {
    outlawClass +=
      " bg-black border-2 border-amber-500 text-white hover:bg-amber-500 hover:text-black hover:shadow-[0_0_20px_4px_rgba(245,158,11,0.4)] active:bg-amber-600 active:text-black";
  } else if (variant === "outline") {
    outlawClass +=
      " bg-transparent border-2 border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-black hover:shadow-[0_0_20px_4px_rgba(245,158,11,0.4)] active:bg-amber-600 active:text-black";
  }

  return (
    <button className={`${outlawClass} ${className || ""}`} {...props} />
  );
}

export { buttonVariants }
