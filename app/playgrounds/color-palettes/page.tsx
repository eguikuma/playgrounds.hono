import type { Metadata } from "next";

import { ColorPalettes } from "@/features/color-palettes";

export const metadata: Metadata = {
  title: "カラーパレット",
};

export default function Page() {
  return <ColorPalettes />;
}
