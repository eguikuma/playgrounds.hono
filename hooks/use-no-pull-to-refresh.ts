"use client";

import { useEffect } from "react";
import { usePullToRefresh } from "./use-pull-to-refresh";

export const useNoPullToRefresh = () => {
  const { on, off } = usePullToRefresh();

  useEffect(() => {
    off();

    return () => on();
  }, [off, on]);
};
