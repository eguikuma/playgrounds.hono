import { memo } from "react";

import { Description, Title } from "@/components/elements/typography";

import { Container } from "@/components/structures/content/container";
import { AnchorGallery } from "../components/anchor-gallery";
import { CheckboxGallery } from "../components/checkbox-gallery";
import { RadioGallery } from "../components/radio-gallery";
import { SelectGallery } from "../components/select-gallery";
import { SymbolGallery } from "../components/symbol-gallery";
import { TextFieldGallery } from "../components/text-field-gallery";
import { TriggerGallery } from "../components/trigger-gallery";
import { TypographyGallery } from "../components/typography-gallery";

export const UIGalleries = memo(() => {
  return (
    <Container>
      <Container>
        <div className="relative flex flex-col gap-4">
          <Title as="h1">UIギャラリー</Title>
          <Description>
            <p>
              <strong>おうちずかん</strong>
              <span>で使用しているUIコンポーネントを紹介します。</span>
            </p>
            <p>
              十分なタッチターゲットサイズを確保し、操作性を向上させる設計にしています。
            </p>
          </Description>
        </div>
      </Container>

      <div className="flex flex-col gap-8 md:gap-12 lg:gap-16">
        <TypographyGallery />
        <SymbolGallery />
        <TriggerGallery />
        <AnchorGallery />
        <TextFieldGallery />
        <CheckboxGallery />
        <RadioGallery />
        <SelectGallery />
      </div>
    </Container>
  );
});

UIGalleries.displayName = "UIGalleries";
