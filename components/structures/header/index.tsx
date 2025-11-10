"use client";

import { memo, type PropsWithChildren } from "react";
import { LogoLink } from "@/components/elements/anchor";
import { AccessibilityControls } from "@/components/tools";
import { useLandscape } from "@/hooks";
import { cn } from "@/styles/functions";

type HeaderProps = {
  className?: string;
} & PropsWithChildren;

export const Header = memo<HeaderProps>(
  ({
    className,
    children = (
      <>
        <LogoLink size="large" className="py-2" />
        <AccessibilityControls className="py-2" />
      </>
    ),
  }) => {
    const isLandscape = useLandscape();

    return (
      <header
        className={cn(
          "sticky top-0 z-cover w-full border-outline border-b bg-foundation",
          isLandscape && "hidden",
          className,
        )}
      >
        <div
          className={cn(
            "mx-auto flex h-14 w-full max-w-7xl items-center justify-between md:h-16",
            "px-4 md:px-6 lg:px-8",
          )}
        >
          {children}
        </div>
      </header>
    );
  },
);

Header.displayName = "Header";
