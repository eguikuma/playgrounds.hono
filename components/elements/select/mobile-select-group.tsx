"use client";

import { ChevronDown, type LucideIcon } from "lucide-react";
import type {
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
} from "react";

import { cn } from "@/styles/functions";

import type { SelectSize, SelectStatus } from "./select-group";

type MobileSelectGroupProps = {
  open: boolean;
  id: string;
  name: string;
  label: string;
  value: string;
  size: SelectSize;
  status: SelectStatus;
  mark?: LucideIcon | ForwardRefExoticComponent<RefAttributes<SVGSVGElement>>;
  placeholder: string;
  required: boolean;
  className: string;
  ariaInvalid: boolean;
  ariaDescribedBy: string;
  children: ReactNode;
  toggle: () => void;
};

export const MobileSelectGroup = ({
  open,
  id,
  name,
  label,
  value,
  size = "default",
  status,
  mark: Mark,
  placeholder,
  required,
  className,
  ariaInvalid,
  ariaDescribedBy,
  children,
  toggle,
}: MobileSelectGroupProps) => {
  const listboxId = `${id}-listbox`;

  const statusStyles = {
    default: "border-outline",
    success: "border-success",
    error: "border-error",
  };

  const sizeStyles = {
    default: "py-3 px-4 min-h-11 text-base",
    large: "py-4 px-5 min-h-14 text-lg",
  };

  const markStyles = {
    default: "h-5 w-5 stroke-2 top-1/2 left-3",
    large: "h-6 w-6 stroke-2 top-1/2 left-4",
  };

  const paddingsStyles = {
    default: "pl-10",
    large: "pl-12.5",
  };

  const classNames = cn(
    "flex items-center justify-between w-full rounded-md border bg-foundation text-primary",
    sizeStyles[size],
    statusStyles[status],
    Mark && paddingsStyles[size],
    open && "focused transition-none!",
    className,
  );

  return (
    <>
      <div className="relative w-full">
        {Mark && (
          <div className={cn("-translate-y-1/2 absolute", markStyles[size])}>
            <Mark
              className={cn("text-secondary", markStyles[size])}
              aria-hidden="true"
            />
          </div>
        )}

        <input
          id={id}
          type="text"
          className="sr-only"
          readOnly
          aria-required={required}
          aria-invalid={ariaInvalid}
          aria-describedby={ariaDescribedBy}
          value={value}
        />

        <button
          type="button"
          className={classNames}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listboxId}
          onClick={toggle}
        >
          <span className={cn("truncate", !value && "text-secondary/70")}>
            {label || placeholder}
          </span>
          <ChevronDown className="h-5 w-5 text-secondary" aria-hidden="true" />
        </button>
      </div>

      <div
        className={cn(
          "fixed inset-0 z-fullscreen bg-primary/30 transition-opacity duration-300",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden={!open}
        onClick={toggle}
      >
        <div
          className={cn(
            "fixed right-0 bottom-0 left-0 z-popup max-h-[80vh] overflow-auto rounded-t-xl bg-foundation shadow-lg",
            "transform transition-transform duration-300",
            open ? "translate-y-0" : "translate-y-full",
          )}
          role="dialog"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-outline border-b p-4 pb-3">
            <span className="flex-1 truncate font-medium text-lg">{name}</span>
            <button
              type="button"
              className="rounded-md px-4 py-2 text-primary hover:bg-primary/10"
              aria-label="閉じる"
              onClick={toggle}
            >
              閉じる
            </button>
          </div>
          <div
            id={listboxId}
            role="listbox"
            aria-labelledby={id}
            className="max-h-[50vh] overflow-hidden overflow-y-auto"
            tabIndex={-1}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
};
