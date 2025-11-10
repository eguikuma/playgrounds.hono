import { Description, Title } from "@/components/elements/typography";

import { Container } from "@/components/structures/content/container";
import { ColorsInUse } from "../components/colors-in-use";
import { ContrastEvaluation } from "../components/contrast-evaluation";

export const ColorPalettes = () => (
  <Container>
    <Container>
      <div className="relative flex flex-col gap-4">
        <Title as="h1">カラーパレット</Title>
        <Description>
          <p>
            <strong>おうちずかん</strong>
            <span>で使用している色を紹介します。</span>
          </p>
          <p>
            十分なコントラスト比を確保し、視認性を向上させる配色を採用しています。
          </p>
        </Description>
      </div>
    </Container>

    <div className="flex flex-col gap-6 md:gap-8 lg:gap-10">
      <ColorsInUse />
      <ContrastEvaluation />
    </div>
  </Container>
);
