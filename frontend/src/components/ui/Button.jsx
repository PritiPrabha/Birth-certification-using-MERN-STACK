import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import './Button.css';

const buttonVariants = cva(
  "btn",
  {
    variants: {
      variant: {
        default: "button-variant-default",
        destructive: "button-variant-destructive",
        outline: "button-variant-outline",
        secondary: "button-variant-secondary",
        ghost: "button-variant-ghost",
        link: "button-variant-link",
      },
      size: {
        default: "btn-md",
        sm: "btn-sm",
        lg: "btn-lg",
        icon: "btn-icon",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? "span" : "button"; // Use span for asChild to avoid button nesting issues
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
