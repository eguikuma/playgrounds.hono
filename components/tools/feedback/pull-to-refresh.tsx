"use client";

import { ArrowDown, RotateCw } from "lucide-react";
import {
  forwardRef,
  type HTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { useForwardedRef, usePullToRefresh } from "@/hooks";
import { date } from "@/services/date";
import { sleep } from "@/services/timer";
import { cn } from "@/styles/functions";

const Dimension = {
  Break: 50,
  RefreshHeight: 60,
  MaxHeight: 100,
  HeightRatio: 1.5,
} as const;

const Resistance = {
  Default: 0.85,
  Strong: 0.2,
} as const;

enum Status {
  Idle = "Idle",
  Refreshing = "Refreshing",
  Refreshed = "Refreshed",
}

type PullToRefreshProps = {
  threshold?: number;
  deadzone?: number;
  holdTimeMilliseconds?: number;
  selector?: string;
  onRefresh?: () => Promise<void> | void;
} & HTMLAttributes<HTMLDivElement>;

export const PullToRefresh = forwardRef<HTMLDivElement, PullToRefreshProps>(
  (
    {
      threshold = 50,
      deadzone = 5,
      holdTimeMilliseconds = 500,
      onRefresh,
      selector = "main",
      className,
      children,
      ...props
    },
    _ref,
  ) => {
    const { enabled } = usePullToRefresh();
    const ref = useForwardedRef(_ref);
    const selectorRef = useRef<HTMLElement | null>(null);

    const [distance, setDistance] = useState(0);
    const [status, setStatus] = useState<Status>(Status.Idle);
    const [isActive, setIsActive] = useState(false);
    const [mounted, setMounted] = useState(false);

    const startY = useRef(0);
    const moveY = useRef(0);
    const startMilliseconds = useRef(0);

    const refresh = useCallback(async () => {
      if (status !== Status.Idle) return;

      setStatus(Status.Refreshing);

      try {
        if (onRefresh) {
          await onRefresh();
        } else {
          window.location.reload();
        }
      } catch (e) {
        console.error("⚠️ 再読込に失敗しました", e);
      } finally {
        setStatus(Status.Refreshed);
        setDistance(0);

        await sleep(500);

        setStatus(Status.Idle);
      }
    }, [onRefresh, status]);

    const reset = useCallback(() => {
      setDistance(0);
      setIsActive(false);
      setStatus(Status.Idle);
      startY.current = 0;
      moveY.current = 0;
      startMilliseconds.current = 0;
    }, []);

    const start = useCallback(
      (e: TouchEvent) => {
        e.stopPropagation();

        const element = selectorRef.current;

        if (!element) return;

        if (element.scrollTop <= 0 && status === Status.Idle) {
          startY.current = e.touches[0].clientY;
          startMilliseconds.current = date().valueOf();
        }
      },
      [status],
    );

    const move = useCallback(
      (e: TouchEvent) => {
        e.stopPropagation();

        const element = selectorRef.current;

        if (!element) return;

        if (
          startY.current === 0 ||
          status !== Status.Idle ||
          element.scrollTop > 0 ||
          date().valueOf() - startMilliseconds.current < holdTimeMilliseconds
        )
          return;

        moveY.current = e.touches[0].clientY;
        let difference = moveY.current - startY.current;

        if (difference <= deadzone) return;

        if (difference > 0) {
          difference = difference - deadzone;

          let distance: number;
          if (difference <= Dimension.Break) {
            distance = difference * Resistance.Default;
          } else {
            distance =
              Dimension.Break * Resistance.Default +
              (difference - Dimension.Break) * Resistance.Strong;
          }

          setDistance(distance);
          setIsActive(distance >= threshold);

          e.preventDefault();
        }
      },
      [status, holdTimeMilliseconds, deadzone, threshold],
    );

    const end = useCallback(() => {
      if (status !== Status.Idle) return;

      if (date().valueOf() - startMilliseconds.current < holdTimeMilliseconds) {
        reset();
        return;
      }

      if (distance >= threshold) {
        refresh();
      } else {
        reset();
      }
    }, [distance, holdTimeMilliseconds, refresh, reset, status, threshold]);

    useEffect(() => {
      if (!enabled) return;

      const element = document.querySelector(selector) as HTMLElement;

      if (element) {
        selectorRef.current = element;

        setMounted(true);
      }
    }, [enabled, selector]);

    useEffect(() => {
      if (!enabled) return;

      const element = selectorRef.current;

      if (!element) return;

      const options = { passive: false };

      element.addEventListener("touchstart", start, options);
      element.addEventListener("touchmove", move, options);
      element.addEventListener("touchend", end);

      return () => {
        element.removeEventListener("touchstart", start);
        element.removeEventListener("touchmove", move);
        element.removeEventListener("touchend", end);
      };
    }, [enabled, end, move, start]);

    return (
      <>
        {enabled &&
          mounted &&
          selectorRef.current &&
          createPortal(
            <div
              ref={ref}
              className={cn(
                "absolute top-0 right-0 left-0 z-cover flex flex-col items-center justify-center bg-foundation/95",
                "overflow-hidden transition-all duration-200",
                className,
              )}
              style={{
                height:
                  status === Status.Refreshing
                    ? `calc(${Dimension.RefreshHeight}px + 1.5rem)`
                    : distance > 0
                      ? `${Math.min(
                          distance * Dimension.HeightRatio,
                          Dimension.MaxHeight,
                        )}px`
                      : "0px",
                opacity: distance > 0 || status === Status.Refreshing ? 1 : 0,
              }}
              {...props}
            >
              {status === Status.Refreshing ? (
                <div className="flex flex-col items-center justify-center p-2 text-primary">
                  <RotateCw className="mb-2 h-6 w-6 animate-spin" />
                  <span className="font-bold text-sm">読み込み中</span>
                </div>
              ) : status === Status.Idle ? (
                <div
                  className={cn(
                    "flex flex-col items-center justify-center p-2 text-secondary",
                    "transition-opacity",
                    distance > 0 ? "opacity-100" : "opacity-0",
                  )}
                >
                  {isActive ? (
                    <RotateCw className="mb-2 h-6 w-6 animate-spin" />
                  ) : (
                    <ArrowDown className="h-6 w-6 animate-bounce" />
                  )}
                  <span className="font-bold text-sm">
                    {isActive ? "指を離して更新" : "もう少し下へ"}
                  </span>
                </div>
              ) : null}
            </div>,
            selectorRef.current,
          )}
        {children}
      </>
    );
  },
);

PullToRefresh.displayName = "PullToRefresh";
