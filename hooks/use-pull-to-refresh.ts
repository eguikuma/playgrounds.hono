"use client";

import { useCallback } from "react";
import { create } from "zustand";

const useStore = create<{
  value: boolean;
  set: (value: boolean) => void;
}>()((_set, _get) => ({
  value: true,
  set: (value) => {
    _set({ value });

    return value;
  },
}));

export const usePullToRefresh = () => {
  const { value, set } = useStore();

  const on = useCallback(() => set(true), [set]);

  const off = useCallback(() => set(false), [set]);

  return {
    enabled: value,
    on,
    off,
  };
};
