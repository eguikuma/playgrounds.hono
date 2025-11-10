"use client";

import { CircleUser } from "lucide-react";
import { memo } from "react";

import { RadioGroup, RadioOption } from "@/components/elements/radio";
import { Title } from "@/components/elements/typography";

import { ComponentCard } from "./component-card";

export const RadioGallery = memo(() => {
  return (
    <section className="flex flex-col gap-4">
      <Title as="h2" accented>
        Radio
      </Title>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        <ComponentCard
          title="単一選択ボタン"
          description="一つの選択肢を表すラジオボタンです。"
          code={`<RadioOption label="はい" value="yes" />`}
        >
          <RadioOption label="はい" value="yes" />
        </ComponentCard>

        <ComponentCard
          title="選択済みボタン"
          description="最初から選択されている状態のラジオボタンです。"
          code={`<RadioOption label="いいえ" value="no" checked />`}
        >
          <RadioOption label="いいえ" value="no" checked />
        </ComponentCard>

        <ComponentCard
          title="選択肢グループ"
          description="複数の選択肢から一つだけ選べるグループです。"
          code={`<RadioGroup label="表示件数" fullWidth>
  <RadioOption label="10件" value="10" />
  <RadioOption label="20件" value="20" />
  <RadioOption label="50件" value="50" />
</RadioGroup>`}
        >
          <RadioGroup label="表示件数" fullWidth>
            <RadioOption label="10件" value="10" />
            <RadioOption label="20件" value="20" />
            <RadioOption label="50件" value="50" />
          </RadioGroup>
        </ComponentCard>

        <ComponentCard
          title="アイコン付きグループ"
          description="グループの内容を示すアイコン付きの選択肢グループです。"
          code={`<RadioGroup label="アカウントタイプ" mark={CircleUser} fullWidth>
  <RadioOption label="個人" value="personal" />
  <RadioOption label="ビジネス" value="business" />
  <RadioOption label="教育機関" value="education" />
</RadioGroup>`}
        >
          <RadioGroup label="アカウントタイプ" mark={CircleUser} fullWidth>
            <RadioOption label="個人" value="personal" />
            <RadioOption label="ビジネス" value="business" />
            <RadioOption label="教育機関" value="education" />
          </RadioGroup>
        </ComponentCard>

        <ComponentCard
          title="大きな選択ボタン"
          description="見やすく押しやすい大きめサイズの選択肢グループです。"
          code={`<RadioGroup label="支払い方法" size="large" fullWidth>
  <RadioOption label="クレジットカード" value="credit_card" />
  <RadioOption label="銀行振込" value="bank_transfer" />
</RadioGroup>`}
        >
          <RadioGroup label="支払い方法" size="large" fullWidth>
            <RadioOption label="クレジットカード" value="credit_card" />
            <RadioOption label="銀行振込" value="bank_transfer" />
          </RadioGroup>
        </ComponentCard>

        <ComponentCard
          title="ヒント付きグループ"
          description="使い方の説明が表示される選択肢グループです。"
          code={`<RadioGroup label="通知設定" helperText="通知の受け取り方法を選択してください" fullWidth>
  <RadioOption label="アプリ内のみ" value="app_only" />
  <RadioOption label="メールのみ" value="email_only" />
  <RadioOption label="両方" value="both" />
</RadioGroup>`}
        >
          <RadioGroup
            label="通知設定"
            helperText="通知の受け取り方法を選択してください"
            fullWidth
          >
            <RadioOption label="アプリ内のみ" value="app_only" />
            <RadioOption label="メールのみ" value="email_only" />
            <RadioOption label="両方" value="both" />
          </RadioGroup>
        </ComponentCard>
      </div>
    </section>
  );
});

RadioGallery.displayName = "RadioGallery";
