"use client";

import { createRef, type RefObject, useEffect } from "react";
import { useScrolling } from "react-use";

export const useScroll = (callback: () => void) => {
  const ref = createRef();

  const isScrolling = useScrolling(ref as RefObject<HTMLElement>);

  useEffect(() => {
    if (!ref.current) {
      ref.current = document.querySelector("main");
    }

    callback();

    if (isScrolling) {
      callback();
    }
  }, [ref, isScrolling, callback]);
};
