import type { Metadata } from "next";

import { UIGalleries } from "@/features/ui-galleries";

export const metadata: Metadata = {
  title: "UIギャラリー",
};

export default function Page() {
  return <UIGalleries />;
}
