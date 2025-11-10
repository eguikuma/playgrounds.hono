"use client";

import {
  type ChangeEvent,
  forwardRef,
  type InputHTMLAttributes,
  useCallback,
  useContext,
  useId,
} from "react";

import { useForwardedRef, useKeyboard } from "@/hooks";
import { cn } from "@/styles/functions";

import { RadioGroupState, type RadioSize } from "./radio-group";

export type RadioStatus = "default" | "error" | "success";

type RadioOptionProps = {
  label?: string;
  size?: RadioSize;
  checked?: boolean;
  helperText?: string;
  error?: string;
  success?: string;
  required?: boolean;
  onChange?: (checked: boolean) => void;
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "checked" | "size" | "onChange"
>;

export const RadioOption = forwardRef<HTMLInputElement, RadioOptionProps>(
  (
    {
      id,
      label,
      size,
      checked,
      helperText,
      error,
      success,
      required,
      disabled,
      value,
      className,
      onChange,
      "aria-describedby": ariaDescribedBy,
      ...props
    },
    _ref,
  ) => {
    const ref = useForwardedRef(_ref);

    const state = useContext(RadioGroupState);

    const isChecked =
      !!checked || (!!value && state.value === value.toString());

    const change = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
          onChange(e.target.checked);
        }
      },
      [onChange],
    );

    const click = useCallback(() => {
      if (isChecked) return;

      if (ref.current) {
        ref.current.click();
      }
    }, [isChecked, ref]);

    const { keydown } = useKeyboard({
      Enter: click,
    });

    const defaultId = useId();

    const inputId = id || defaultId;

    const messageId = `${inputId}-message`;

    const hasError = !!error;

    const hasSuccess = !hasError && !!success;

    const message = error || success || helperText;

    const status: RadioStatus = hasError
      ? "error"
      : hasSuccess
        ? "success"
        : "default";

    const statusStyles = {
      default: "border-outline",
      success: "border-success",
      error: "border-error",
    };

    const statusTextStyles = {
      default: "text-secondary",
      success: "text-success",
      error: "text-error",
    };

    const containerSizeStyles = {
      default: "h-6 w-6",
      large: "h-8 w-8",
    };

    const labelSizeStyles = {
      default: "text-base",
      large: "text-lg mb-1",
    };

    const classNames = cn("peer sr-only", className);

    return (
      <div className="flex flex-col">
        <div className="flex items-start">
          <div className="flex h-11 items-center">
            <div className="relative flex items-center">
              <input
                ref={ref}
                type="radio"
                id={inputId}
                value={value}
                checked={isChecked}
                disabled={disabled}
                required={required}
                className={classNames}
                aria-describedby={message ? messageId : ariaDescribedBy}
                onChange={change}
                {...props}
              />
              <div
                className={cn(
                  "no-min-size flex cursor-pointer items-center justify-center rounded-full border bg-foundation",
                  containerSizeStyles[size || state.size],
                  statusStyles[status],
                  isChecked && "border-brand p-1",
                  disabled && "disabled",
                )}
                role="button"
                tabIndex={disabled ? undefined : 0}
                onClick={disabled ? undefined : click}
                onKeyDown={disabled ? undefined : keydown}
              >
                <div
                  className={cn(
                    "text-brand opacity-0",
                    isChecked && "size-full rounded-full bg-brand opacity-100",
                  )}
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>

          {label && (
            <label
              htmlFor={inputId}
              className={cn(
                "ml-2 block cursor-pointer rounded font-medium text-primary",
                "flex min-h-11 items-center",
                labelSizeStyles[size || state.size],
                disabled && "disabled",
              )}
            >
              {label}
              {required && <span className="mt-1 ml-1 text-error">*</span>}
            </label>
          )}
        </div>

        {message && (
          <p
            id={messageId}
            className={cn("select-none pb-2 text-xs", statusTextStyles[status])}
          >
            {message}
          </p>
        )}
      </div>
    );
  },
);

RadioOption.displayName = "RadioOption";
