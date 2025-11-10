import type { LucideIcon } from "lucide-react";

import { CheckCircle2, LoaderCircle, XCircle } from "lucide-react";
import {
  type ButtonHTMLAttributes,
  Children,
  type ForwardRefExoticComponent,
  forwardRef,
  type RefAttributes,
} from "react";
import { cn } from "@/styles/functions";

type ButtonKind = "primary" | "secondary" | "ghost";

type ButtonSize = "default" | "large";

type ButtonMarkPosition = "left" | "right";

export const ButtonStatus = {
  Idle: "Idle",
  Loading: "Loading",
  Success: "Success",
  Error: "Error",
} as const;

export type ButtonStatus = (typeof ButtonStatus)[keyof typeof ButtonStatus];

export type ButtonProps = {
  kind?: ButtonKind;
  size?: ButtonSize;
  mark?: LucideIcon | ForwardRefExoticComponent<RefAttributes<SVGSVGElement>>;
  markPosition?: ButtonMarkPosition;
  fullWidth?: boolean;
  status?: ButtonStatus;

  "aria-label"?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      kind = "primary",
      size = "default",
      mark: Mark,
      markPosition = "left",
      status = ButtonStatus.Idle,
      fullWidth = false,
      disabled,
      type = "button",
      "aria-label": ariaLabel,
      ...props
    },
    ref,
  ) => {
    const isDisabled =
      disabled ||
      status === ButtonStatus.Loading ||
      status === ButtonStatus.Success ||
      status === ButtonStatus.Error;

    const hasTextContent = Children.toArray(children).some(
      (child) => typeof child === "string" || typeof child === "number",
    );

    const baseStyles =
      "rounded-md font-medium shadow-sm flex items-center justify-center gap-2 relative";

    const kindStyles = {
      primary: "bg-brand text-foreground hover:bg-brand/90 active:bg-brand/80",
      secondary:
        "bg-accent text-foreground hover:bg-accent/90 active:bg-accent/80",
      ghost:
        "bg-primary/10 text-primary hover:bg-primary/20 active:bg-primary/20",
    };

    const sizeStyles = {
      default: "py-2 px-4 min-h-11",
      large: "py-3 px-6 text-lg min-h-14",
    };

    const markStyles = {
      default: "h-5 w-5 stroke-2",
      large: "h-6 w-6 stroke-2",
    };

    const statusStyles = {
      Idle: "",
      Loading: "cursor-wait",
      Success:
        "bg-success text-foreground hover:bg-success/90 active:bg-success/80",
      Error: "bg-error text-foreground hover:bg-error/90 active:bg-error/80",
    };

    const statusMarks = {
      Loading: (
        <LoaderCircle className={cn("animate-spin", markStyles[size])} />
      ),
      Success: <CheckCircle2 className={markStyles[size]} />,
      Error: <XCircle className={markStyles[size]} />,
    };

    const classNames = cn(
      baseStyles,
      kindStyles[kind],
      sizeStyles[size],
      statusStyles[status],
      fullWidth ? "w-full" : "",
      className,
    );

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={classNames}
        aria-label={!hasTextContent ? ariaLabel : "ボタン"}
        {...props}
      >
        <div
          className={cn(
            "flex items-center justify-center gap-2",
            status !== ButtonStatus.Idle ? "opacity-50" : "",
          )}
        >
          {Mark && markPosition === "left" && (
            <Mark className={markStyles[size]} aria-hidden="true" />
          )}

          <span>{children}</span>

          {Mark && markPosition === "right" && (
            <Mark className={markStyles[size]} aria-hidden="true" />
          )}
        </div>

        {status !== ButtonStatus.Idle && (
          <div className="absolute inset-0 flex items-center justify-center">
            {statusMarks[status]}
          </div>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";
