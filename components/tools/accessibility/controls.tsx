"use client";

import { Glasses, Moon, Sun, ZoomIn, ZoomOut } from "lucide-react";
import { forwardRef, type HTMLAttributes } from "react";

import { useContrast, useSize, useTheme } from "@/hooks";
import { cn } from "@/styles/functions";

import { Mark } from "../../elements/trigger";

type AccessibilityControlsProps = HTMLAttributes<HTMLDivElement>;

export const AccessibilityControls = forwardRef<
  HTMLDivElement,
  AccessibilityControlsProps
>(({ className, ...props }, ref) => {
  const theme = useTheme();
  const contrast = useContrast();
  const size = useSize();

  return (
    <div
      ref={ref}
      className={cn("flex items-center gap-1 md:gap-2", className)}
      {...props}
    >
      <Mark
        value={!theme.value ? null : theme.isLight ? Sun : Moon}
        size="small"
        kind="ghost"
        onClick={theme.toggle}
        role="button"
        aria-label={
          theme.isLight ? "ダークモードに変更する" : "ライトモードに変更する"
        }
      />

      <Mark
        value={Glasses}
        size="small"
        kind="ghost"
        className={cn(contrast.isHigh && "strong-stroke")}
        onClick={contrast.toggle}
        role="button"
        aria-label={
          contrast.isNormal
            ? "高コントラストに変更する"
            : "通常コントラストに変更する"
        }
      />

      <Mark
        value={ZoomIn}
        size="small"
        kind="ghost"
        filled={size.isLarge}
        onClick={size.increase}
        disabled={size.isLarge}
        role="button"
        aria-label="文字を大きくする"
      />

      <Mark
        value={ZoomOut}
        size="small"
        kind="ghost"
        filled={size.isSmall}
        onClick={size.decrease}
        disabled={size.isSmall}
        role="button"
        aria-label="文字を小さくする"
      />
    </div>
  );
});

AccessibilityControls.displayName = "AccessibilityControls";
