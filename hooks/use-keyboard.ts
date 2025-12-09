"use client";

import { type KeyboardEvent, useCallback, useEffect } from "react";

const AvailableKey = {
  ArrowUp: "ArrowUp",
  ArrowDown: "ArrowDown",
  ArrowLeft: "ArrowLeft",
  ArrowRight: "ArrowRight",
  Enter: "Enter",
  Escape: "Escape",
} as const;

type AvailableKey = (typeof AvailableKey)[keyof typeof AvailableKey];

type Handler = () => void;

type Handlers = {
  [key in AvailableKey]?: Handler | null;
};

type Options = {
  global?: boolean;
};

export const useKeyboard = (handlers: Handlers, options: Options = {}) => {
  const { global = false } = options;

  const keydown = useCallback(
    (event: KeyboardEvent<HTMLElement> | globalThis.KeyboardEvent) => {
      const handler = handlers[event.key as AvailableKey];

      if (handler) {
        event.preventDefault();

        handler();
      }
    },
    [handlers],
  );

  useEffect(() => {
    if (!global) return;

    document.addEventListener("keydown", keydown);

    return () => {
      document.removeEventListener("keydown", keydown);
    };
  }, [global, keydown]);

  return {
    keydown,
  };
};
