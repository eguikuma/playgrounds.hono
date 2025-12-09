import { memo, type PropsWithChildren } from "react";
import { useLandscape } from "@/hooks";
import { cn } from "@/styles/functions";
import { Centered } from "./centered";
import { Container } from "./container";

type CoveredProps = {
  className?: string;
} & PropsWithChildren;

export const Covered = memo<CoveredProps>(({ className, children }) => {
  const isLandscape = useLandscape();

  return (
    <div
      className={cn(
        "no-scrollbar overflow-hidden overflow-y-auto",
        "fixed inset-0 z-cover size-full",
        !isLandscape &&
          "my-[3.5rem] h-[calc(100%-3.5rem)] md:my-0 md:mt-[4rem] md:h-[calc(100%-8.5rem)]",
        "py-4 md:py-6 lg:py-8",
        "px-4 md:px-6 lg:px-8",
        className,
      )}
    >
      <Centered>
        <Container>{children}</Container>
      </Centered>
    </div>
  );
});

Covered.displayName = "Covered";
