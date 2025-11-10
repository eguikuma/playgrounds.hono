import type { LucideIcon } from "lucide-react";
import {
  type ForwardRefExoticComponent,
  forwardRef,
  type HTMLAttributes,
  type RefAttributes,
} from "react";
import { cn } from "@/styles/functions";

type TitleProps = {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  accented?: boolean;
  mark?: LucideIcon | ForwardRefExoticComponent<RefAttributes<SVGSVGElement>>;
} & HTMLAttributes<HTMLHeadingElement>;

export const Title = forwardRef<HTMLHeadingElement, TitleProps>(
  (
    {
      children,
      as: Component = "h1",
      accented = false,
      mark: Mark,
      className,
      ...props
    },
    ref,
  ) => {
    const levelStyles = {
      h1: "text-3xl md:text-4xl font-extrabold",
      h2: "text-2xl md:text-3xl font-bold",
      h3: "text-xl md:text-2xl font-semibold",
      h4: "text-lg md:text-xl font-medium",
      h5: "text-base md:text-lg font-medium",
      h6: "text-sm md:text-base font-medium",
    };

    const markStyles = {
      h1: "h-12 w-12 stroke-2",
      h2: "h-10 w-10 stroke-2",
      h3: "h-8 w-8 stroke-2",
      h4: "h-6 w-6 stroke-2",
      h5: "h-5 w-5 stroke-2",
      h6: "h-4 w-4 stroke-2",
    };

    const classNames = cn(
      "tracking-tight text-primary",
      levelStyles[Component],
      Mark && "flex items-center gap-2",
      className,
    );

    return (
      <div className="flex flex-col">
        <Component ref={ref} className={classNames} {...props}>
          {Mark && <Mark className={markStyles[Component]} />}
          {accented ? (
            <span className="relative inline-flex items-center">
              <span className="relative">{children}</span>
              <span className="absolute bottom-1 left-0 h-3 w-[calc(100%+8px)] rounded-sm bg-brand opacity-20" />
            </span>
          ) : (
            children
          )}
        </Component>
      </div>
    );
  },
);

Title.displayName = "Title";
