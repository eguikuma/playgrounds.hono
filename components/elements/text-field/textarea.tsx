"use client";

import type { LucideIcon } from "lucide-react";
import {
  type ForwardRefExoticComponent,
  forwardRef,
  type RefAttributes,
  type TextareaHTMLAttributes,
  useCallback,
  useEffect,
  useId,
  useRef,
} from "react";
import { useForwardedRef, useLockOnFocus } from "@/hooks";
import { cn } from "@/styles/functions";

type TextareaSize = "default" | "large";

type TextareaStatus = "default" | "error" | "success";

type TextareaProps = {
  label?: string;
  size?: TextareaSize;
  helperText?: string;
  error?: string;
  success?: string;
  mark?: LucideIcon | ForwardRefExoticComponent<RefAttributes<SVGSVGElement>>;
  fullWidth?: boolean;
  autoResize?: boolean;
  minRows?: number;
  maxRows?: number;
  counter?: boolean;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size">;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      id,
      label,
      className,
      size = "default",
      helperText,
      error,
      success,
      mark: Mark,
      placeholder,
      disabled,
      required,
      fullWidth = false,
      autoResize = false,
      minRows = 3,
      maxRows = 10,
      counter = false,
      value,
      defaultValue,
      "aria-describedby": ariaDescribedBy,
      ...props
    },
    _ref,
  ) => {
    const counterRef = useRef<HTMLDivElement>(null);

    const ref = useForwardedRef(_ref);

    useLockOnFocus(ref);

    const resize = useCallback(() => {
      if (!autoResize || !ref.current) return;

      ref.current.style.height = "auto";

      const lineHeight =
        Number.parseFloat(getComputedStyle(ref.current).lineHeight) ||
        Number.parseFloat(getComputedStyle(ref.current).fontSize) * 1.2;

      const paddingTop = Number.parseFloat(
        getComputedStyle(ref.current).paddingTop,
      );
      const paddingBottom = Number.parseFloat(
        getComputedStyle(ref.current).paddingBottom,
      );
      const totalPadding = paddingTop + paddingBottom;

      const minHeight = minRows * lineHeight + totalPadding;
      const maxHeight = maxRows
        ? maxRows * lineHeight + totalPadding
        : Number.POSITIVE_INFINITY;

      const scrollHeight = ref.current.scrollHeight;

      ref.current.style.height = `${Math.min(Math.max(scrollHeight, minHeight), maxHeight)}px`;
    }, [autoResize, ref, minRows, maxRows]);

    const count = useCallback(() => {
      if (!counter || !ref.current || !counterRef.current) return;

      const currentLength = ref.current.value.length;
      const maxLength =
        ref.current.maxLength > 0 ? ref.current.maxLength : null;

      if (maxLength) {
        counterRef.current.textContent = `${currentLength} / ${maxLength}`;
      } else {
        counterRef.current.textContent = `${currentLength} 文字`;
      }
    }, [counter, ref]);

    const input = useCallback(() => {
      resize();
      count();
    }, [resize, count]);

    useEffect(() => {
      if (ref.current) {
        input();
      }
    }, [input, ref]);

    const defaultId = useId();

    const inputId = id || defaultId;

    const messageId = `${inputId}-message`;

    const hasError = !!error;

    const hasSuccess = !hasError && !!success;

    const message = error || success || helperText;

    const status: TextareaStatus = hasError
      ? "error"
      : hasSuccess
        ? "success"
        : "default";

    const sizeStyles = {
      default: "py-3 px-4 min-h-20 text-base",
      large: "py-4 px-5 min-h-24 text-lg",
    };

    const markStyles = {
      default: "h-5 w-5 stroke-2 top-1/2 left-3",
      large: "h-6 w-6 stroke-2 top-1/2 left-4",
    };

    const paddingStyles = {
      default: "pl-10",
      large: "pl-12.5",
    };

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

    const classNames = cn(
      "block w-full rounded-md border bg-foundation text-primary placeholder:text-secondary/70!",
      "resize-none",
      /** @see https://docs.keeper.io/en/user-guides/troubleshooting/website-developers */
      "keeper-ignore",
      sizeStyles[size],
      statusStyles[status],
      Mark && paddingStyles[size],
      className,
    );

    return (
      <div
        className={cn("flex flex-col gap-1", fullWidth ? "w-full" : "w-fit")}
      >
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "flex items-center font-medium text-primary",
              size === "large" ? "text-lg" : "text-base",
            )}
          >
            {label}
            {required && <span className="mt-1 ml-1 text-error">*</span>}
          </label>
        )}

        <div className="relative">
          {Mark && (
            <div className={cn("-translate-y-1/2 absolute", markStyles[size])}>
              <Mark
                className={cn("text-secondary", markStyles[size])}
                aria-hidden="true"
              />
            </div>
          )}

          <textarea
            ref={ref}
            id={inputId}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            className={classNames}
            aria-invalid={hasError}
            aria-describedby={message ? messageId : ariaDescribedBy}
            onInput={input}
            value={value}
            defaultValue={defaultValue}
            {...props}
          />
        </div>

        <div className="flex items-center justify-between">
          {message && (
            <p
              id={messageId}
              className={cn(
                "mt-1 select-none text-sm",
                statusTextStyles[status],
              )}
            >
              {message}
            </p>
          )}

          {counter && (
            <div
              ref={counterRef}
              className="mt-1 ml-auto text-secondary text-sm"
              aria-live="polite"
            >
              0 文字
            </div>
          )}
        </div>
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
