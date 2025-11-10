export type Rgb = { r: number; g: number; b: number };

export const hexToRgb = (hex: string): Rgb => {
  const replaced = hex.startsWith("#") ? hex.slice(1) : hex;

  if (replaced.length === 3) {
    const r = Number.parseInt(replaced.charAt(0) + replaced.charAt(0), 16);
    const g = Number.parseInt(replaced.charAt(1) + replaced.charAt(1), 16);
    const b = Number.parseInt(replaced.charAt(2) + replaced.charAt(2), 16);
    return { r, g, b };
  }

  if (replaced.length === 6) {
    const r = Number.parseInt(replaced.substring(0, 2), 16);
    const g = Number.parseInt(replaced.substring(2, 4), 16);
    const b = Number.parseInt(replaced.substring(4, 6), 16);
    return { r, g, b };
  }

  throw new Error();
};
