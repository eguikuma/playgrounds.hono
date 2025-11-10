"use client";

import { useMedia } from "react-use";

export const DeviceSize = {
  MobileBreakpoint: 768,
  TabletBreakpoint: 1024,
} as const;

export const UIDimension = {
  SelectDropdownMaxHeight: 320,
  BottomSafetyMargin: 90,
} as const;

export const useResponsive = () => {
  const isMobile = useMedia(
    `(max-width: ${DeviceSize.MobileBreakpoint}px)`,
    true,
  );

  const isTablet = useMedia(
    `(min-width: ${DeviceSize.MobileBreakpoint + 1}px) and (max-width: ${DeviceSize.TabletBreakpoint}px)`,
    false,
  );

  const isDesktop = useMedia(
    `(min-width: ${DeviceSize.TabletBreakpoint + 1}px)`,
    false,
  );

  return {
    isMobile,
    isTablet,
    isDesktop,
  };
};
