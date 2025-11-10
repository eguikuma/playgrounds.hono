import { memo } from "react";

import { Logo } from "@/components/elements/symbol";
import { Title } from "@/components/elements/typography";

import { ComponentCard } from "./component-card";

export const SymbolGallery = memo(() => {
  return (
    <section className="flex flex-col gap-4">
      <Title as="h2" accented>
        Symbol
      </Title>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        <ComponentCard
          title="標準ロゴ"
          description="標準カラーのロゴです。"
          code={`<Logo className="h-16 w-16" />`}
        >
          <Logo className="h-16 w-16" />
        </ComponentCard>

        <ComponentCard
          title="カラーロゴ"
          description="色を変更したカスタムカラーのロゴです。"
          code={`<Logo className="h-16 w-16" color="#3d4aa2" />`}
        >
          <Logo className="h-16 w-16" color="#3d4aa2" />
        </ComponentCard>
      </div>
    </section>
  );
});

SymbolGallery.displayName = "SymbolGallery";
