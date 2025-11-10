"use client";

import TopLoader, {
  type NextTopLoaderProps as TopLoaderProps,
} from "nextjs-toploader";
import { forwardRef } from "react";

export const TransitionProgress = forwardRef<HTMLDivElement, TopLoaderProps>(
  (props, ref) => (
    <div ref={ref}>
      <TopLoader
        color="var(--color-brand)"
        height={6}
        showSpinner={false}
        easing="ease-out"
        speed={400}
        crawlSpeed={200}
        zIndex={2000}
        {...props}
      />
    </div>
  ),
);

TransitionProgress.displayName = "TransitionProgress";
