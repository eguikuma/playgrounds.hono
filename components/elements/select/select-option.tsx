"use client";

import { Check } from "lucide-react";
import {
  forwardRef,
  type HTMLAttributes,
  useCallback,
  useContext,
  useId,
} from "react";

import { useResponsive } from "@/hooks";
import { cn } from "@/styles/functions";

import { SelectGroupState } from "./select-group";

type SelectOptionProps = {
  label: string;
  value: string;
  disabled?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export const SelectOption = forwardRef<HTMLDivElement, SelectOptionProps>(
  (
    { id, value, label, disabled = false, className, children, ...props },
    ref,
  ) => {
    const state = useContext(SelectGroupState);

    const { isMobile } = useResponsive();

    const isSelected = state.value === value;

    const defaultId = useId();

    const inputId = id || defaultId;

    const sizeStyles = {
      default: "py-3 px-4 text-base",
      large: "py-4 px-5 text-lg",
    };

    const classNames = cn(
      "flex cursor-pointer select-none items-center justify-between border-outline border-b last:border-none",
      "hover:bg-primary/10 active:bg-primary/10 transition-all duration-200",
      sizeStyles[state.size],
      isMobile && "py-4",
      isSelected
        ? "bg-brand text-foreground font-semibold hover:bg-brand active:bg-brand"
        : "text-primary",
      disabled && "disabled",
      className,
    );

    const select = useCallback(() => {
      if (disabled) return;

      state.change(value, label || "");
    }, [disabled, label, state, value]);

    return (
      <div
        ref={ref}
        id={inputId}
        className={classNames}
        role="option"
        tabIndex={-1}
        aria-selected={isSelected}
        aria-disabled={disabled}
        onClick={select}
        {...props}
      >
        <span>{label || children}</span>
        {isSelected && (
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-foreground">
            <Check className="h-4 w-4 stroke-2 text-brand" aria-hidden="true" />
          </div>
        )}
      </div>
    );
  },
);

SelectOption.displayName = "SelectOption";
