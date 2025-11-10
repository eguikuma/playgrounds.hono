"use client";

import { ChevronDown, ChevronUp, type LucideIcon } from "lucide-react";
import {
  type ForwardRefExoticComponent,
  type ReactNode,
  type RefAttributes,
  useCallback,
  useRef,
  useState,
} from "react";

import { UIDimension, useResize, useScroll } from "@/hooks";
import { cn } from "@/styles/functions";

import type { SelectSize, SelectStatus } from "./select-group";

type DesktopSelectGroupProps = {
  open: boolean;
  id: string;
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

export const DesktopSelectGroup = ({
  open,
  id,
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
}: DesktopSelectGroupProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPositionedAbove, setIsPositionedAbove] = useState(false);

  const adjust = useCallback(() => {
    const element = containerRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();
    const elementBottom = rect.bottom;
    const viewportHeight = window.innerHeight;
    const availableSpaceBelow = viewportHeight - elementBottom;

    const dropdownHeight = UIDimension.SelectDropdownMaxHeight;
    const safetyMargin = UIDimension.BottomSafetyMargin;

    setIsPositionedAbove(availableSpaceBelow < dropdownHeight + safetyMargin);
  }, []);

  useResize(adjust);

  useScroll(adjust);

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
    open && "focused",
    className,
  );

  return (
    <div className="relative" ref={containerRef}>
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
        {open ? (
          <ChevronUp className="h-5 w-5 text-secondary" aria-hidden="true" />
        ) : (
          <ChevronDown className="h-5 w-5 text-secondary" aria-hidden="true" />
        )}
      </button>

      <div
        className={cn(
          "absolute z-popup w-full rounded-md border border-outline bg-foundation shadow-lg",
          "transition-all duration-200",
          open ? "opacity-100" : "pointer-events-none opacity-0",
          isPositionedAbove ? "bottom-full mb-2" : "top-full mt-2",
        )}
        id={listboxId}
        role="listbox"
        tabIndex={-1}
        aria-labelledby={id}
      >
        <div className="max-h-80 overflow-hidden overflow-y-auto rounded-md">
          {children}
        </div>
      </div>
    </div>
  );
};
