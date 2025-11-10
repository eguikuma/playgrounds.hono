"use client";

import { useCallback, useEffect, useMemo } from "react";

import { create } from "zustand";

export const ThemeLocalStorageKey = "theme";

export const ThemeDomAttributeName = "data-theme";

export const ThemeKind = {
  Light: "Light",
  Dark: "Dark",
} as const;

type ThemeKind = (typeof ThemeKind)[keyof typeof ThemeKind];

const useStore = create<{
  value: ThemeKind | null;
  set: (value: ThemeKind) => ThemeKind;
}>()((_set, _get) => ({
  value: null,
  set: (value) => {
    _set({ value });

    return value;
  },
}));

export const useTheme = () => {
  const { value, set } = useStore();

  const isLight = useMemo(() => value === ThemeKind.Light, [value]);

  const isDark = useMemo(() => value === ThemeKind.Dark, [value]);

  const update = useCallback((value: ThemeKind) => {
    document.documentElement.setAttribute(ThemeDomAttributeName, value);
    localStorage.setItem(ThemeLocalStorageKey, value);
  }, []);

  const toggle = useCallback(
    () =>
      update(set(value === ThemeKind.Light ? ThemeKind.Dark : ThemeKind.Light)),
    [set, update, value],
  );

  useEffect(() => {
    const value = (localStorage.getItem(ThemeLocalStorageKey) ||
      ThemeKind.Light) as ThemeKind;

    update(value);

    set(value);
  }, [set, update]);

  return {
    key: ThemeLocalStorageKey,
    value,
    isLight,
    isDark,
    toggle,
  };
};
