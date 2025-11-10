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

interface ImageProps extends NextImageProps {
  timeout?: number;
  retries?: number;
}

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  ({ timeout = 5000, retries = 5, ...props }, _ref) => {
    const { ref, current } = useForwardedRef<HTMLImageElement>(_ref);

    const enabled = useEnabledWindow();

    const { load, cache } = useSourceCache(props.src);

    const status = load();

    const [count, setCount] = useState(0);

    const timer = useRef<NodeJS.Timeout | null>(null);

    const cleanup = useCallback(() => {
      if (timer.current) {
        clearTimeout(timer.current);
        timer.current = null;
      }
    }, []);

    const complete = useCallback(
      () => cache(props.src, SourceStatus.Complete),
      [cache, props.src],
    );

    const error = useCallback(
      () => cache(props.src, SourceStatus.Error),
      [cache, props.src],
    );

    const retry = useCallback(() => {
      if (current && current.complete && current.naturalWidth > 0) {
        complete();

        cleanup();

        setCount(0);
      } else if (count < retries) {
        setCount((previous) => previous + 1);
      } else {
        error();
      }
    }, [cleanup, complete, count, current, error, retries]);

    useEffect(() => {
      if (enabled && status === SourceStatus.Idle && props.src) {
        cache(props.src, SourceStatus.Loading);
      }
    }, [enabled, status, props.src, cache]);

    useEffect(() => {
      if (status === SourceStatus.Loading && count <= retries) {
        timer.current = setTimeout(retry, timeout);
        return () => cleanup();
      }
    }, [cleanup, count, retry, status, timeout, retries]);

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
          ref={ref}
          {...props}
          className={cn(
            props.className,
            status !== SourceStatus.Complete && "opacity-0",
          )}
          unoptimized
          onLoad={complete}
          onError={error}
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
