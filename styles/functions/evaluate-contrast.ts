import { hexToRgb, type Rgb } from "./hex-to-rgb";

const WcagContrastRatio = {
  AALarge: 3,
  AANormal: 4.5,
  AAALarge: 4.5,
  AAANormal: 7,
  ElderlyFriendly: 7,
} as const;

const ContrastLevel = {
  Perfect: "Perfect",
  VeryGood: "VeryGood",
  Good: "Good",
  Normal: "Normal",
  Bad: "Bad",
  VeryBad: "VeryBad",
} as const;

type ContrastLevel = (typeof ContrastLevel)[keyof typeof ContrastLevel];

const ContrastBadge = {
  "Perfect": "最高",
  "VeryGood": "非常に良い",
  "Good": "良い",
  "Normal": "普通",
  "Bad": "低い",
  "VeryBad": "非常に低い",
} as const satisfies Record<ContrastLevel, string>;

type ContrastBadge = (typeof ContrastBadge)[keyof typeof ContrastBadge];

const ContrastDescription = {
  "Perfect": "高齢者向けにも適した視認性",
  "VeryGood": "すべてのWCAG基準を満たす",
  "Good": "通常サイズのテキストに適した視認性",
  "Normal": "大きなテキストに適した視認性",
  "Bad": "大きなテキストのみ基準を満たす",
  "VeryBad": "WCAG基準を満たしていない",
} as const satisfies Record<ContrastLevel, string>;

type ContrastDescription =
  (typeof ContrastDescription)[keyof typeof ContrastDescription];

const ContrastColor = {
  "Perfect": "#00796B",
  "VeryGood": "#388E3C",
  "Good": "#1976D2",
  "Normal": "#FBC02D",
  "Bad": "#F57C00",
  "VeryBad": "#D32F2F",
} as const satisfies Record<ContrastLevel, string>;

type ContrastColor = (typeof ContrastColor)[keyof typeof ContrastColor];

export const evaluateContrast = (
  foreground: string,
  background: string,
): {
  ratio: number;
  badge: ContrastBadge;
  description: ContrastDescription;
  color: ContrastColor;
} => {
  const ratio = getRatio(foreground, background);

  const isElderlyFriendly = ratio >= WcagContrastRatio.ElderlyFriendly;
  const isAAANormal = ratio >= WcagContrastRatio.AAANormal;
  const isAANormal = ratio >= WcagContrastRatio.AANormal;
  const isAAALarge = ratio >= WcagContrastRatio.AAALarge;
  const isAALarge = ratio >= WcagContrastRatio.AALarge;

  let level: ContrastLevel;
  if (isAAANormal) {
    level = isElderlyFriendly ? ContrastLevel.Perfect : ContrastLevel.VeryGood;
  } else if (isAANormal) {
    level = ContrastLevel.Good;
  } else if (isAAALarge) {
    level = ContrastLevel.Normal;
  } else if (isAALarge) {
    level = ContrastLevel.Bad;
  } else {
    level = ContrastLevel.VeryBad;
  }

  return {
    ratio,
    badge: ContrastBadge[level],
    description: ContrastDescription[level],
    color: ContrastColor[level],
  };
};

const getLuminance = (color: Rgb): number => {
  const sRGB = {
    r: color.r / 255,
    g: color.g / 255,
    b: color.b / 255,
  };

  const rgb = {
    r: sRGB.r <= 0.03928 ? sRGB.r / 12.92 : ((sRGB.r + 0.055) / 1.055) ** 2.4,
    g: sRGB.g <= 0.03928 ? sRGB.g / 12.92 : ((sRGB.g + 0.055) / 1.055) ** 2.4,
    b: sRGB.b <= 0.03928 ? sRGB.b / 12.92 : ((sRGB.b + 0.055) / 1.055) ** 2.4,
  };

  return 0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b;
};

const getRatio = (color1: string, color2: string): number => {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  const luminance1 = getLuminance(rgb1);
  const luminance2 = getLuminance(rgb2);

  const lighter = Math.max(luminance1, luminance2);
  const darker = Math.min(luminance1, luminance2);

  return (lighter + 0.05) / (darker + 0.05);
};
