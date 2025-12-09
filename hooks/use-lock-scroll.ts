"use client";

import { useCallback, useEffect, useRef } from "react";

export const useLockScroll = () => {
  const ref = useRef<HTMLElement | null>(null);
  const overflow = useRef<string | null>(null);

  const lock = useCallback(() => {
    if (!ref.current) return;

    ref.current.style.overflow = "hidden";
  }, []);

  const unlock = useCallback(() => {
    if (!ref.current) return;

    ref.current.style.overflow = overflow.current ?? "auto";
  }, []);

  useEffect(() => {
    if (!ref.current) {
      ref.current = document.querySelector("main");
    }

    if (ref.current) {
      overflow.current = ref.current.style.overflow;
    }

    lock();

    return () => unlock();
  }, [lock, unlock]);

  return {};
};
