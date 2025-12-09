import { memo, type PropsWithChildren } from "react";
import { cn } from "@/styles/functions";

type ContainerProps = {
  className?: string;
} & PropsWithChildren;

export const Container = memo<ContainerProps>(({ className, children }) => (
  <div className={cn("flex flex-col gap-4 md:gap-6 lg:gap-8", className)}>
    {children}
  </div>
));

Container.displayName = "Container";
