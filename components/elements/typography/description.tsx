import { forwardRef, type HTMLAttributes } from "react";

import { cn } from "@/styles/functions";

type DescriptionSize = "small" | "default" | "large";

type DescriptionProps = {
  size?: DescriptionSize;
  maxWidth?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export const Description = forwardRef<HTMLDivElement, DescriptionProps>(
  (
    { children, size = "default", maxWidth = true, className, ...props },
    ref,
  ) => {
    const sizeStyles = {
      small: "text-sm md:text-base",
      default: "text-base md:text-lg",
      large: "text-lg md:text-xl",
    };

    const classNames = cn(
      "flex flex-col gap-2 text-secondary",
      sizeStyles[size],
      maxWidth && "max-w-2xl",
      className,
    );

    return (
      <div ref={ref} className={classNames} {...props}>
        {children}
      </div>
    );
  },
);

Description.displayName = "Description";
