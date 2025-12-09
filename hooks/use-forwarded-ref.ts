"use client";

import { type Ref, useCallback, useRef } from "react";

export const useForwardedRef = <T extends HTMLElement>(ref: Ref<T>) => {
  const innerRef = useRef<T | null>(null);

  const set = useCallback(
    (node: T | null) => {
      innerRef.current = node;

      if (!ref) return;

      if (typeof ref === "function") {
        ref(node);
      } else {
        /* eslint-disable-next-line react-hooks/immutability */
        ref.current = node;
      }
    },
    [ref],
  );

  return {
    ref: set,
    current: innerRef.current,
  };
};
