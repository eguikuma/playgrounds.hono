import { Home } from "lucide-react";
import { memo } from "react";

import { Description, Title } from "@/components/elements/typography";

import { ComponentCard } from "./component-card";

export const TypographyGallery = memo(() => {
  return (
    <section className="flex flex-col gap-4">
      <Title as="h2" accented>
        Typography
      </Title>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        <ComponentCard
          title="見出し（大）"
          description="ページや各セクションの主要タイトルを表示します。"
          code={`<Title as="h1">
  メインタイトル
</Title>`}
        >
          <Title as="h1">メインタイトル</Title>
        </ComponentCard>

        <ComponentCard
          title="強調見出し（大）"
          description="目立つアクセント付きの主要タイトルです。"
          code={`<Title as="h1" accented>
  メインタイトル
</Title>`}
        >
          <Title as="h1" accented>
            メインタイトル
          </Title>
        </ComponentCard>

        <ComponentCard
          title="見出し（中）"
          description="セクションのタイトルを表示します。"
          code={`<Title as="h2">
  セクションタイトル
</Title>`}
        >
          <Title as="h2">セクションタイトル</Title>
        </ComponentCard>

        <ComponentCard
          title="アイコン付き見出し"
          description="アイコン付きの見出しです。"
          code={`<Title as="h2" mark={Home}>
  セクションタイトル
</Title>`}
        >
          <Title as="h2" mark={Home}>
            セクションタイトル
          </Title>
        </ComponentCard>

        <ComponentCard
          title="見出し（小）"
          description="項目のタイトルを表示します。"
          code={`<Title as="h3">
  サブセクションタイトル
</Title>`}
        >
          <Title as="h3">サブセクションタイトル</Title>
        </ComponentCard>

        <ComponentCard
          title="標準の説明文"
          description="タイトルの下に表示される補足情報や説明を提供します。"
          code={`<Description>
  <p>これは説明文です。主にタイトルの下に表示され、補足情報を提供します。</p>
  <p>複数段落にも対応しています。</p>
</Description>`}
        >
          <Description>
            <p>
              これは説明文です。主にタイトルの下に表示され、補足情報を提供します。
            </p>
            <p>複数段落にも対応しています。</p>
          </Description>
        </ComponentCard>

        <ComponentCard
          title="小さめの説明文"
          description="控えめに表示したい補足情報に使用します。"
          code={`<Description size="small">
  <p>これは小さめの説明文です。補足的な情報を控えめに表示したい場合に使用します。</p>
</Description>`}
        >
          <Description size="small">
            <p>
              これは小さめの説明文です。補足的な情報を控えめに表示したい場合に使用します。
            </p>
          </Description>
        </ComponentCard>

        <ComponentCard
          title="大きめの説明文"
          description="強調したい補足情報に使用します。"
          code={`<Description size="large">
  <p>これは大きめの説明文です。強調したい補足情報を表示したい場合に使用します。</p>
</Description>`}
        >
          <Description size="large">
            <p>
              これは大きめの説明文です。強調したい補足情報を表示したい場合に使用します。
            </p>
          </Description>
        </ComponentCard>
      </div>
    </section>
  );
});

TypographyGallery.displayName = "TypographyGallery";
