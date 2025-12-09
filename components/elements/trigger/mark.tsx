"use client";

import type { LucideIcon } from "lucide-react";
import {
  type ButtonHTMLAttributes,
  type ForwardRefExoticComponent,
  forwardRef,
  type RefAttributes,
  useState,
} from "react";
import { cn } from "@/styles/functions";

type MarkKind = "primary" | "secondary" | "ghost";

type MarkSize = "small" | "default" | "large";

type TooltipPosition = "top" | "right" | "bottom" | "left";

type MarkProps = {
  value:
    | LucideIcon
    | ForwardRefExoticComponent<RefAttributes<SVGSVGElement>>
    | null;
  size?: MarkSize;
  kind?: MarkKind;
  filled?: boolean;
  tooltip?: string;
  tooltipPosition?: TooltipPosition;

  "aria-label": string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "value" | "aria-label">;

export const Mark = forwardRef<HTMLButtonElement, MarkProps>(
  (
    {
      value: Value,
      size = "default",
      kind = "primary",
      filled = false,
      tooltip,
      tooltipPosition = "top",
      className,
      disabled,
      "aria-label": ariaLabel,
      ...props
    },
    ref,
  ) => {
    const [enabledTooltip, setEnabledTooltip] = useState(false);

    const baseStyles =
      "rounded-full flex items-center justify-center shadow-sm relative";

    const kindStyles = {
      primary: filled
        ? "bg-brand text-foreground border-2 border-brand/30"
        : "bg-transparent text-brand border-2 border-brand/30 hover:bg-brand/30 active:bg-brand/40",
      secondary: filled
        ? "bg-accent text-foreground border-2 border-accent/30"
        : "bg-transparent text-accent border-2 border-accent/30 hover:bg-accent/30 active:bg-accent/40",
      ghost: filled
        ? cn(
            "bg-primary/10 text-primary",
            disabled ? "border-none" : "border-2 border-primary/20",
          )
        : "bg-transparent text-primary border-2 border-primary/20 hover:bg-primary/10 active:bg-primary/20",
    };

    const sizeStyles = {
      small: "p-1.5 min-h-9 min-w-9",
      default: "p-2 min-h-11 min-w-11",
      large: "p-2.5 min-h-14 min-w-14",
    };

    const valueStyles = {
      small: "h-4 w-4 stroke-2",
      default: "h-5 w-5 stroke-2",
      large: "h-6 w-6 stroke-2",
    };

    const tooltipStyles = {
      primary: "bg-brand text-foreground",
      secondary: "bg-accent text-foreground",
      ghost: "bg-primary text-foundation",
    };

    const tooltipArrowStyles = {
      primary: "border-t-brand",
      secondary: "border-t-accent",
      ghost: "border-t-primary",
    };

    const tooltipSizeStyles = {
      small: "px-2.5 py-2 text-xs",
      default: "px-3 py-2.5 text-sm",
      large: "px-3.5 py-2 text-md",
    };

    const tooltipPositionStyles = {
      top: "absolute bottom-full left-1/2 -translate-x-1/2 -translate-y-2",
      right: "absolute top-1/2 left-full translate-x-2 -translate-y-1/2",
      bottom: "absolute top-full left-1/2 -translate-x-1/2 translate-y-2",
      left: "absolute top-1/2 right-full -translate-x-2 -translate-y-1/2",
    };

    const tooltipArrowPositionStyles = {
      top: "absolute top-full left-1/2 -translate-x-1/2 -translate-y-px",
      right: "absolute right-full top-1/2 translate-x-px -translate-y-1/2",
      bottom: "absolute bottom-full left-1/2 -translate-x-1/2 translate-y-px",
      left: "absolute left-full top-1/2 -translate-x-px -translate-y-1/2",
    };

    const tooltipArrowDirectionStyles = {
      top: tooltipArrowStyles[kind],
      right: tooltipArrowStyles[kind].replace("border-t-", "border-r-"),
      bottom: tooltipArrowStyles[kind].replace("border-t-", "border-b-"),
      left: tooltipArrowStyles[kind].replace("border-t-", "border-l-"),
    };

    const tooltipArrowBorderStyles = {
      top: "border-8 border-transparent",
      right: "border-8 border-transparent",
      bottom: "border-8 border-transparent",
      left: "border-8 border-transparent",
    };

    const classNames = cn(
      baseStyles,
      kindStyles[kind],
      sizeStyles[size],
      className,
    );

    return (
      <div className="relative inline-block">
        <button
          ref={ref}
          type="button"
          disabled={disabled}
          aria-label={ariaLabel}
          aria-pressed={filled}
          className={classNames}
          onMouseEnter={() => tooltip && setEnabledTooltip(true)}
          onMouseLeave={() => tooltip && setEnabledTooltip(false)}
          onFocus={() => tooltip && setEnabledTooltip(true)}
          onBlur={() => tooltip && setEnabledTooltip(false)}
          {...props}
        >
          {Value && <Value className={valueStyles[size]} aria-hidden="true" />}

          {tooltip && (
            <div
              className={cn(
                "z-popup flex transform items-center whitespace-nowrap rounded shadow-md transition-opacity duration-200",
                tooltipStyles[kind],
                tooltipSizeStyles[size],
                tooltipPositionStyles[tooltipPosition],
                enabledTooltip
                  ? "opacity-100"
                  : "pointer-events-none opacity-0",
              )}
              aria-hidden={!enabledTooltip}
            >
              <span>{tooltip}</span>
              <div
                className={cn(
                  tooltipArrowPositionStyles[tooltipPosition],
                  "transform",
                )}
              >
                <div
                  className={cn(
                    tooltipArrowBorderStyles[tooltipPosition],
                    tooltipArrowDirectionStyles[tooltipPosition],
                  )}
                />
              </div>
            </div>
          )}
        </button>
      </div>
    );
  },
);

Mark.displayName = "Mark";
