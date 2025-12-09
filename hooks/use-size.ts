"use client";

import { useCallback, useEffect, useMemo } from "react";

import { create } from "zustand";

export const SizeLocalStorageKey = "size";

export const SizeDomAttributeName = "data-size";

export const SizeKind = {
  Small: "Small",
  Normal: "Normal",
  Large: "Large",
} as const;

type SizeKind = (typeof SizeKind)[keyof typeof SizeKind];

const useStore = create<{
  value: SizeKind | null;
  set: (value: SizeKind) => SizeKind;
}>()((_set, _get) => ({
  value: null,
  set: (value) => {
    _set({ value });

    return value;
  },
}));

export const useSize = () => {
  const { value, set } = useStore();

  const isSmall = useMemo(() => value === SizeKind.Small, [value]);

  const isNormal = useMemo(() => value === SizeKind.Normal, [value]);

  const isLarge = useMemo(() => value === SizeKind.Large, [value]);

  const update = useCallback((value: SizeKind) => {
    document.documentElement.setAttribute(SizeDomAttributeName, value);
    localStorage.setItem(SizeLocalStorageKey, value);
  }, []);

  const increase = useCallback(
    () =>
      update(
        set(
          value === SizeKind.Small
            ? SizeKind.Normal
            : value === SizeKind.Normal
              ? SizeKind.Large
              : SizeKind.Large,
        ),
      ),
    [set, update, value],
  );

  const decrease = useCallback(
    () =>
      update(
        set(
          value === SizeKind.Large
            ? SizeKind.Normal
            : value === SizeKind.Normal
              ? SizeKind.Small
              : SizeKind.Small,
        ),
      ),
    [set, update, value],
  );

  useEffect(() => {
    const value = (localStorage.getItem(SizeLocalStorageKey) ||
      SizeKind.Normal) as SizeKind;

    update(value);

    set(value);
  }, [set, update]);

  return {
    key: SizeLocalStorageKey,
    value,
    isSmall,
    isNormal,
    isLarge,
    increase,
    decrease,
  };
};
