"use client";

import { useEffect } from "react";

export const useResize = (callback: (e?: UIEvent) => void) => {
  useEffect(() => {
    window.addEventListener("resize", callback);

    callback();

    return () => window.removeEventListener("resize", callback);
  }, [callback]);
};
