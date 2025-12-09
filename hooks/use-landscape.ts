import { isMobile } from "react-device-detect";
import { useOrientation } from "react-use";

export const useLandscape = () => {
  const orientation = useOrientation();

  const isLandscape = orientation.angle === 90 || orientation.angle === -90;

  return isMobile && isLandscape;
};
