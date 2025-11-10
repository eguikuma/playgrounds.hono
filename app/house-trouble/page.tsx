import type { Metadata } from "next";
import { Description, Title } from "@/components/elements/typography";

export const metadata: Metadata = {
  title: "トラブル発生",
};

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <Title as="h1">おやおや...</Title>
      <Description>
        <p>おうちの中で何かトラブルが起こったようです。</p>
      </Description>
    </div>
  );
}
