export const varsToHex = (vars: string): string =>
  typeof window !== "undefined"
    ? getComputedStyle(document.documentElement).getPropertyValue(vars).trim()
    : "";
