"use client";

import { type RefObject, useCallback, useEffect, useState } from "react";
import { useLockBodyScroll } from "react-use";

export const useLockOnFocus = (ref: RefObject<HTMLElement | null>) => {
  const [element, setElement] = useState<HTMLElement | null>(null);
  const [locked, setLocked] = useState(false);

  useLockBodyScroll(locked);

  const lock = useCallback(() => setLocked(true), []);

  const unlock = useCallback(() => setLocked(false), []);

  useEffect(() => {
    if (!element) {
      setElement(ref.current);

      return;
    }

    element.addEventListener("focus", lock);

    element.addEventListener("blur", unlock);

    return () => {
      element.removeEventListener("focus", lock);
      element.removeEventListener("blur", unlock);
    };
  }, [element, lock, ref, unlock]);
};
