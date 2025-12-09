"use client";

import { List } from "lucide-react";
import { memo } from "react";

import { CheckboxGroup, CheckboxOption } from "@/components/elements/checkbox";
import { Title } from "@/components/elements/typography";

import { ComponentCard } from "./component-card";

export const CheckboxGallery = memo(() => {
  return (
    <section className="flex flex-col gap-4">
      <Title as="h2" accented>
        Checkbox
      </Title>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        <ComponentCard
          title="選択ボックス"
          description="単一の選択肢を選ぶためのチェックボックスです。"
          code={`<CheckboxOption label="利用規約に同意する" />`}
        >
          <CheckboxOption label="利用規約に同意する" />
        </ComponentCard>

        <ComponentCard
          title="選択済みボックス"
          description="最初から選択されている状態のチェックボックスです。"
          code={`<CheckboxOption label="お知らせメールを受け取る" checked />`}
        >
          <CheckboxOption label="お知らせメールを受け取る" checked />
        </ComponentCard>

        <ComponentCard
          title="ヒント付き選択ボックス"
          description="説明が表示されるチェックボックスです。"
          code={`<CheckboxOption label="マーケティングメールを受け取る" helperText="最新の情報やお得な情報をお届けします" />`}
        >
          <CheckboxOption
            label="マーケティングメールを受け取る"
            helperText="最新の情報やお得な情報をお届けします"
          />
        </ComponentCard>

        <ComponentCard
          title="チェックボックスグループ"
          description="複数の選択肢からいくつでも選べるグループです。"
          code={`<CheckboxGroup label="興味のある分野" fullWidth>
  <CheckboxOption label="料理" value="cooking" />
  <CheckboxOption label="旅行" value="travel" />
  <CheckboxOption label="ガーデニング" value="gardening" />
</CheckboxGroup>`}
        >
          <CheckboxGroup label="興味のある分野" fullWidth>
            <CheckboxOption label="料理" value="cooking" />
            <CheckboxOption label="旅行" value="travel" />
            <CheckboxOption label="ガーデニング" value="gardening" />
          </CheckboxGroup>
        </ComponentCard>

        <ComponentCard
          title="アイコン付きグループ"
          description="グループの内容を示すアイコン付きのチェックボックスグループです。"
          code={`<CheckboxGroup label="どの記事を表示しますか？" mark={List} fullWidth>
  <CheckboxOption label="最新記事" value="latest" />
  <CheckboxOption label="人気記事" value="popular" />
  <CheckboxOption label="おすすめ記事" value="recommended" />
</CheckboxGroup>`}
        >
          <CheckboxGroup label="どの記事を表示しますか？" mark={List} fullWidth>
            <CheckboxOption label="最新記事" value="latest" />
            <CheckboxOption label="人気記事" value="popular" />
            <CheckboxOption label="おすすめ記事" value="recommended" />
          </CheckboxGroup>
        </ComponentCard>

        <ComponentCard
          title="大きなチェックボックス"
          description="見やすく押しやすい大きめサイズのチェックボックスグループです。"
          code={`<CheckboxGroup label="表示オプション" size="large" fullWidth>
  <CheckboxOption label="写真を表示" value="pictures" />
  <CheckboxOption label="コメントを表示" value="comments" />
</CheckboxGroup>`}
        >
          <CheckboxGroup label="表示オプション" size="large" fullWidth>
            <CheckboxOption label="写真を表示" value="pictures" />
            <CheckboxOption label="コメントを表示" value="comments" />
          </CheckboxGroup>
        </ComponentCard>
      </div>
    </section>
  );
});

CheckboxGallery.displayName = "CheckboxGallery";
