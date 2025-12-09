"use client";

import { useCallback, useEffect, useMemo } from "react";

import { create } from "zustand";

export const ContrastLocalStorageKey = "contrast";

export const ContrastDomAttributeName = "data-contrast";

export const ContrastKind = {
  Normal: "Normal",
  High: "High",
} as const;

type ContrastKind = (typeof ContrastKind)[keyof typeof ContrastKind];

const useStore = create<{
  value: ContrastKind | null;
  set: (value: ContrastKind) => ContrastKind;
}>()((_set, _get) => ({
  value: null,
  set: (value) => {
    _set({ value });

    return value;
  },
}));

export const useContrast = () => {
  const { value, set } = useStore();

  const isNormal = useMemo(() => value === ContrastKind.Normal, [value]);

  const isHigh = useMemo(() => value === ContrastKind.High, [value]);

  const update = useCallback((value: ContrastKind) => {
    document.documentElement.setAttribute(ContrastDomAttributeName, value);

    localStorage.setItem(ContrastLocalStorageKey, value);
  }, []);

  const toggle = useCallback(
    () =>
      update(
        set(
          value === ContrastKind.Normal
            ? ContrastKind.High
            : ContrastKind.Normal,
        ),
      ),
    [set, update, value],
  );

  useEffect(() => {
    const value = (localStorage.getItem(ContrastLocalStorageKey) ||
      ContrastKind.Normal) as ContrastKind;

    update(value);

    set(value);
  }, [set, update]);

  return {
    key: ContrastLocalStorageKey,
    value,
    isNormal,
    isHigh,
    toggle,
  };
};
