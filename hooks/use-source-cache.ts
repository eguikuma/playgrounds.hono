"use client";

import type { ImageProps } from "next/image";
import { useCallback } from "react";
import { create } from "zustand";

export const SourceStatus = {
  Idle: "Idle",
  Loading: "Loading",
  Complete: "Complete",
  Error: "Error",
} as const;

type SourceStatus = (typeof SourceStatus)[keyof typeof SourceStatus];

const toSource = (src: ImageProps["src"]) =>
  typeof src === "string" ? src : "default" in src ? src.default.src : src.src;

const useStore = create<{
  statuses: Record<string, SourceStatus>;
  cache: (src: ImageProps["src"], status: SourceStatus) => void;
}>()((_set, _get) => ({
  statuses: {},
  cache: (src, status) => {
    _set((state) => ({
      statuses: { ...state.statuses, [toSource(src)]: status },
    }));
  },
}));

export const useSourceCache = (src: ImageProps["src"]) => {
  const { statuses, cache } = useStore();

  const load = useCallback(
    (url = src) => statuses[toSource(url)] || SourceStatus.Idle,
    [statuses, src],
  );

  return { load, cache };
};
