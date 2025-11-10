import type { Metadata } from "next";
import { Enter } from "@/features/house-entries";

export const metadata: Metadata = {
  title: "入口",
};

export default function Page() {
  return <Enter />;
}
