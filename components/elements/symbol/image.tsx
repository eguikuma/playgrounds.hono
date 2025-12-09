"use client";

import { ImageOff, LoaderCircle } from "lucide-react";
import NextImage, { type ImageProps as NextImageProps } from "next/image";
import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import {
  SourceStatus,
  useEnabledWindow,
  useForwardedRef,
  useSourceCache,
} from "@/hooks";
import { cn } from "@/styles/functions";

const Default = {
  retries: 5,
  timeout: 10000,
  delay: {
    base: 1000,
    max: 30000,
  },
};

interface ImageProps extends NextImageProps {
  retries?: number;
  timeout?: number;
  delay?: {
    base?: number;
    max?: number;
  };
}

const backoff = (attempt: number, base: number, max: number) =>
  Math.min(
    /** Exponential */
    base * 2 ** attempt +
      /** Jitter */
      Math.random() * base,
    max,
  );

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  (
    { retries = Default.retries, timeout = Default.timeout, delay, ...props },
    _ref,
  ) => {
    const { ref } = useForwardedRef<HTMLImageElement>(_ref);

    const { base, max } = { ...Default.delay, ...delay };

    const enabled = useEnabledWindow();

    const { load, cache } = useSourceCache(props.src);

    const status = load();

    const [count, setCount] = useState(0);

    const timer = useRef<{
      retry: NodeJS.Timeout | null;
      timeout: NodeJS.Timeout | null;
    }>({
      retry: null,
      timeout: null,
    });

    const cleanup = useCallback(() => {
      if (timer.current.retry) {
        clearTimeout(timer.current.retry);
        timer.current.retry = null;
      }
      if (timer.current.timeout) {
        clearTimeout(timer.current.timeout);
        timer.current.timeout = null;
      }
    }, []);

    const complete = useCallback(() => {
      cleanup();

      cache(props.src, SourceStatus.Complete);
    }, [cache, cleanup, props.src]);

    const error = useCallback(() => {
      cleanup();

      cache(props.src, SourceStatus.Error);
    }, [cache, cleanup, props.src]);

    const retry = useCallback(() => {
      if (count < retries) {
        timer.current.retry = setTimeout(
          () => {
            setCount((previous) => previous + 1);
          },
          backoff(count, base, max),
        );
      } else {
        error();
      }
    }, [base, count, error, max, retries]);

    const watch = useCallback(() => {
      cleanup();

      timer.current.timeout = setTimeout(() => {
        retry();
      }, timeout);
    }, [cleanup, retry, timeout]);

    useEffect(() => {
      if (enabled && status === SourceStatus.Idle && props.src) {
        cache(props.src, SourceStatus.Loading);
      }
    }, [enabled, status, props.src, cache]);

    useEffect(() => {
      return () => cleanup();
    }, [cleanup]);

    if (status === SourceStatus.Error || !props.src) {
      return (
        <div className="flex h-full w-full items-center justify-center">
          <ImageOff className="h-8 w-8 text-primary/40" />
        </div>
      );
    }

    return (
      <>
        <NextImage
          key={count}
          ref={ref}
          {...props}
          className={cn(
            props.className,
            status !== SourceStatus.Complete && "opacity-0",
          )}
          unoptimized
          onLoadStart={watch}
          onLoad={complete}
          onError={retry}
        />
        {(status === SourceStatus.Idle || status === SourceStatus.Loading) && (
          <div className="absolute inset-0 flex animate-pulse items-center justify-center">
            <LoaderCircle className="h-8 w-8 animate-spin text-primary/40" />
          </div>
        )}
      </>
    );
  },
);

Image.displayName = "Image";
