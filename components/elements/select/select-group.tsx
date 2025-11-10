"use client";

import type { LucideIcon } from "lucide-react";
import {
  createContext,
  type ForwardRefExoticComponent,
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
  type RefAttributes,
  useCallback,
  useId,
  useRef,
  useState,
} from "react";
import { useClickAway, useToggle } from "react-use";
import { useKeyboard, useResponsive } from "@/hooks";
import { cn } from "@/styles/functions";
import { DesktopSelectGroup } from "./desktop-select-group";
import { MobileSelectGroup } from "./mobile-select-group";

export type SelectSize = "default" | "large";

export type SelectStatus = "default" | "error" | "success";

export const SelectGroupState = createContext<{
  value: string;
  open: boolean;
  size: SelectSize;
  change: (value: string, label: string) => void;
  toggle: () => void;
}>({
  value: "",
  open: false,
  size: "default",
  change: () => {},
  toggle: () => {},
});

type SelectGroupProps = {
  label?: string;
  value?: string;
  size?: SelectSize;
  helperText?: string;
  error?: string;
  success?: string;
  mark?: LucideIcon | ForwardRefExoticComponent<RefAttributes<SVGSVGElement>>;
  placeholder?: string;
  required?: boolean;
  fullWidth?: boolean;
  children: ReactNode;
  onChange?: (value: string) => void;
} & Omit<HTMLAttributes<HTMLDivElement>, "onChange">;

export const SelectGroup = forwardRef<HTMLDivElement, SelectGroupProps>(
  (
    {
      label = "",
      size = "default",
      helperText,
      error,
      success,
      mark: Mark,
      value = "",
      placeholder = "選択してください",
      required = false,
      fullWidth = false,
      children,
      className = "",
      "aria-describedby": ariaDescribedBy = "",
      onChange,
      ...props
    },
    ref,
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const [selected, setSelected] = useState<{ label: string; value: string }>({
      label: "",
      value,
    });

    const [open, toggle] = useToggle(false);

    const { keydown } = useKeyboard({
      Enter: toggle,
    });

    useClickAway(containerRef, () => open && toggle());

    const { isMobile } = useResponsive();

    const defaultId = useId();

    const groupId = `select-group-${defaultId}`;

    const messageId = `${groupId}-message`;

    const hasError = !!error;

    const hasSuccess = !hasError && !!success;

    const message = error || success || helperText;

    const status: SelectStatus = hasError
      ? "error"
      : hasSuccess
        ? "success"
        : "default";

    const statusTextStyles = {
      default: "text-secondary",
      success: "text-success",
      error: "text-error",
    };

    const change = useCallback(
      (value: string, label: string) => {
        if (onChange) {
          onChange(value);
        }

        setSelected({ label, value });

        toggle();
      },
      [onChange, toggle],
    );

    return (
      <div
        className={cn("flex flex-col gap-1", fullWidth ? "w-full" : "w-fit")}
        ref={ref}
        {...props}
      >
        {label && (
          <div className="flex items-center">
            <label
              htmlFor={groupId}
              className={cn(
                "flex size-full items-center font-medium text-primary",
                size === "large" ? "text-lg" : "text-base",
              )}
              onClick={toggle}
              onKeyDown={keydown}
            >
              {label}
              {required && <span className="mt-1 ml-1 text-error">*</span>}
            </label>
          </div>
        )}

        <div className="size-full" ref={containerRef}>
          <SelectGroupState.Provider
            value={{
              value: selected.value,
              open,
              size,
              change,
              toggle,
            }}
          >
            {isMobile ? (
              <MobileSelectGroup
                open={open}
                id={groupId}
                name={label}
                label={selected.label}
                value={selected.value}
                size={size}
                status={status}
                mark={Mark}
                placeholder={placeholder}
                required={required}
                className={className}
                ariaInvalid={hasError}
                ariaDescribedBy={messageId || ariaDescribedBy}
                toggle={toggle}
              >
                {children}
              </MobileSelectGroup>
            ) : (
              <DesktopSelectGroup
                open={open}
                id={groupId}
                label={selected.label}
                value={selected.value}
                size={size}
                status={status}
                mark={Mark}
                placeholder={placeholder}
                required={required}
                className={className}
                ariaInvalid={hasError}
                ariaDescribedBy={messageId || ariaDescribedBy}
                toggle={toggle}
              >
                {children}
              </DesktopSelectGroup>
            )}
          </SelectGroupState.Provider>
        </div>

        {message && (
          <p
            id={messageId}
            className={cn("mt-1 select-none text-sm", statusTextStyles[status])}
          >
            {message}
          </p>
        )}
      </div>
    );
  },
);

SelectGroup.displayName = "SelectGroup";
