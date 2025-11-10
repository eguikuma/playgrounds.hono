import { memo, type PropsWithChildren } from "react";
import { cn } from "@/styles/functions";

type CenteredProps = {
  className?: string;
} & PropsWithChildren;

export const Centered = memo<CenteredProps>(({ className, children }) => (
  <div
    className={cn(
      "mx-auto h-auto max-w-lg sm:h-full sm:content-center",
      className,
    )}
  >
    {children}
  </div>
));

Centered.displayName = "Centered";
