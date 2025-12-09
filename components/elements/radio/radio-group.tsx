"use client";

import type { LucideIcon } from "lucide-react";
import {
  type ChangeEvent,
  createContext,
  type ForwardRefExoticComponent,
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
  type RefAttributes,
  useCallback,
  useId,
  useState,
} from "react";
import { cn } from "@/styles/functions";
import type { RadioStatus } from "./radio-option";

export type RadioSize = "default" | "large";

export const RadioGroupState = createContext<{
  value: string;
  size: RadioSize;
}>({
  value: "",
  size: "default",
});

type RadioGroupProps = {
  label?: string;
  value?: string;
  size?: RadioSize;
  helperText?: string;
  error?: string;
  success?: string;
  mark?: LucideIcon | ForwardRefExoticComponent<RefAttributes<SVGSVGElement>>;
  required?: boolean;
  fullWidth?: boolean;
  children: ReactNode;
  onChange?: (value: string) => void;
} & Omit<HTMLAttributes<HTMLFieldSetElement>, "onChange" | "defaultValue">;

export const RadioGroup = forwardRef<HTMLFieldSetElement, RadioGroupProps>(
  (
    {
      label,
      size = "default",
      helperText,
      error,
      success,
      mark: Mark,
      value = "",
      required,
      fullWidth = false,
      children,
      className,
      "aria-describedby": ariaDescribedBy,
      onChange,
      ...props
    },
    ref,
  ) => {
    const [selected, setSelected] = useState<string>(value);

    const change = useCallback(
      (e: ChangeEvent<HTMLFieldSetElement>) => {
        const radio = e.target as unknown as HTMLInputElement;

        if (!radio) return;

        if (onChange) {
          onChange(radio.value);
        }

        setSelected(radio.value);
      },
      [onChange],
    );

    const defaultId = useId();

    const groupId = `radio-group-${defaultId}`;

    const legendId = `${groupId}-legend`;

    const messageId = `${groupId}-message`;

    const hasError = !!error;

    const hasSuccess = !hasError && !!success;

    const message = error || success || helperText;

    const status: RadioStatus = hasError
      ? "error"
      : hasSuccess
        ? "success"
        : "default";

    const statusTextStyles = {
      default: "text-secondary",
      success: "text-success",
      error: "text-error",
    };

    const sizeStyles = {
      default: "text-base",
      large: "text-lg",
    };

    const markStyles = {
      default: "h-5 w-5 stroke-2 mr-2",
      large: "h-6 w-6 stroke-2 mr-2",
    };

    return (
      <fieldset
        ref={ref}
        className={cn(
          "flex flex-col gap-1",
          fullWidth ? "w-full" : "",
          className,
        )}
        aria-describedby={message ? messageId : ariaDescribedBy}
        aria-invalid={hasError}
        onChange={change}
        {...props}
      >
        {label && (
          <legend
            id={legendId}
            className={cn(
              "mb-1 flex items-center font-medium text-primary",
              sizeStyles[size],
            )}
          >
            {Mark && <Mark className={markStyles[size]} aria-hidden="true" />}
            {label}
            {required && <span className="mt-1 ml-1 text-error">*</span>}
          </legend>
        )}

        <RadioGroupState.Provider
          value={{
            value: selected,
            size,
          }}
        >
          <div className="flex flex-col border-brand/60 border-l-4 pl-2">
            {children}
          </div>
        </RadioGroupState.Provider>

        {message && (
          <p
            id={messageId}
            className={cn("mt-1 select-none text-sm", statusTextStyles[status])}
          >
            {message}
          </p>
        )}
      </fieldset>
    );
  },
);

RadioGroup.displayName = "RadioGroup";
