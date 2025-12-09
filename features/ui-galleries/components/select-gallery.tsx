"use client";

import { Calendar } from "lucide-react";
import { memo } from "react";

import { SelectGroup, SelectOption } from "@/components/elements/select";
import { Title } from "@/components/elements/typography";

import { ComponentCard } from "./component-card";

export const SelectGallery = memo(() => {
  return (
    <section className="flex flex-col gap-4">
      <Title as="h2" accented>
        Select
      </Title>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        <ComponentCard
          title="標準プルダウン"
          description="リストから一つ選択できるドロップダウンメニューです。"
          code={`<SelectGroup label="都道府県" fullWidth>
  <SelectOption label="北海道" value="hokkaido" />
  <SelectOption label="青森県" value="aomori" />
  <SelectOption label="岩手県" value="iwate" />
  <SelectOption label="宮城県" value="miyagi" />
  <SelectOption label="秋田県" value="akita" />
  <SelectOption label="山形県" value="yamagata" />
  <SelectOption label="福島県" value="fukushima" />
  <SelectOption label="茨城県" value="ibaraki" />
  <SelectOption label="栃木県" value="tochigi" />
  <SelectOption label="群馬県" value="gunma" />
  <SelectOption label="埼玉県" value="saitama" />
  <SelectOption label="千葉県" value="chiba" />
  <SelectOption label="東京都" value="tokyo" />
  <SelectOption label="神奈川県" value="kanagawa" />
  <SelectOption label="新潟県" value="niigata" />
  <SelectOption label="富山県" value="toyama" />
  <SelectOption label="石川県" value="ishikawa" />
  <SelectOption label="福井県" value="fukui" />
  <SelectOption label="山梨県" value="yamanashi" />
  <SelectOption label="長野県" value="nagano" />
  <SelectOption label="岐阜県" value="gifu" />
  <SelectOption label="静岡県" value="shizuoka" />
  <SelectOption label="愛知県" value="aichi" />
  <SelectOption label="三重県" value="mie" />
  <SelectOption label="滋賀県" value="shiga" />
  <SelectOption label="京都府" value="kyoto" />
  <SelectOption label="大阪府" value="osaka" />
  <SelectOption label="兵庫県" value="hyogo" />
  <SelectOption label="奈良県" value="nara" />
  <SelectOption label="和歌山県" value="wakayama" />
  <SelectOption label="鳥取県" value="tottori" />
  <SelectOption label="島根県" value="shimane" />
  <SelectOption label="岡山県" value="okayama" />
  <SelectOption label="広島県" value="hiroshima" />
  <SelectOption label="山口県" value="yamaguchi" />
  <SelectOption label="徳島県" value="tokushima" />
  <SelectOption label="香川県" value="kagawa" />
  <SelectOption label="愛媛県" value="ehime" />
  <SelectOption label="高知県" value="kochi" />
  <SelectOption label="福岡県" value="fukuoka" />
  <SelectOption label="佐賀県" value="saga" />
  <SelectOption label="長崎県" value="nagasaki" />
  <SelectOption label="熊本県" value="kumamoto" />
  <SelectOption label="大分県" value="oita" />
  <SelectOption label="宮崎県" value="miyazaki" />
  <SelectOption label="鹿児島県" value="kagoshima" />
  <SelectOption label="沖縄県" value="okinawa" />
</SelectGroup>`}
        >
          <SelectGroup label="都道府県" fullWidth>
            <SelectOption label="北海道" value="hokkaido" />
            <SelectOption label="青森県" value="aomori" />
            <SelectOption label="岩手県" value="iwate" />
            <SelectOption label="宮城県" value="miyagi" />
            <SelectOption label="秋田県" value="akita" />
            <SelectOption label="山形県" value="yamagata" />
            <SelectOption label="福島県" value="fukushima" />
            <SelectOption label="茨城県" value="ibaraki" />
            <SelectOption label="栃木県" value="tochigi" />
            <SelectOption label="群馬県" value="gunma" />
            <SelectOption label="埼玉県" value="saitama" />
            <SelectOption label="千葉県" value="chiba" />
            <SelectOption label="東京都" value="tokyo" />
            <SelectOption label="神奈川県" value="kanagawa" />
            <SelectOption label="新潟県" value="niigata" />
            <SelectOption label="富山県" value="toyama" />
            <SelectOption label="石川県" value="ishikawa" />
            <SelectOption label="福井県" value="fukui" />
            <SelectOption label="山梨県" value="yamanashi" />
            <SelectOption label="長野県" value="nagano" />
            <SelectOption label="岐阜県" value="gifu" />
            <SelectOption label="静岡県" value="shizuoka" />
            <SelectOption label="愛知県" value="aichi" />
            <SelectOption label="三重県" value="mie" />
            <SelectOption label="滋賀県" value="shiga" />
            <SelectOption label="京都府" value="kyoto" />
            <SelectOption label="大阪府" value="osaka" />
            <SelectOption label="兵庫県" value="hyogo" />
            <SelectOption label="奈良県" value="nara" />
            <SelectOption label="和歌山県" value="wakayama" />
            <SelectOption label="鳥取県" value="tottori" />
            <SelectOption label="島根県" value="shimane" />
            <SelectOption label="岡山県" value="okayama" />
            <SelectOption label="広島県" value="hiroshima" />
            <SelectOption label="山口県" value="yamaguchi" />
            <SelectOption label="徳島県" value="tokushima" />
            <SelectOption label="香川県" value="kagawa" />
            <SelectOption label="愛媛県" value="ehime" />
            <SelectOption label="高知県" value="kochi" />
            <SelectOption label="福岡県" value="fukuoka" />
            <SelectOption label="佐賀県" value="saga" />
            <SelectOption label="長崎県" value="nagasaki" />
            <SelectOption label="熊本県" value="kumamoto" />
            <SelectOption label="大分県" value="oita" />
            <SelectOption label="宮崎県" value="miyazaki" />
            <SelectOption label="鹿児島県" value="kagoshima" />
            <SelectOption label="沖縄県" value="okinawa" />
          </SelectGroup>
        </ComponentCard>

        <ComponentCard
          title="アイコン付きプルダウン"
          description="内容を示すアイコン付きのプルダウンメニューです。"
          code={`<SelectGroup label="月を選択" mark={Calendar} fullWidth>
  <SelectOption label="1月" value="1" />
  <SelectOption label="2月" value="2" />
  <SelectOption label="3月" value="3" />
</SelectGroup>`}
        >
          <SelectGroup label="月を選択" mark={Calendar} fullWidth>
            <SelectOption label="1月" value="1" />
            <SelectOption label="2月" value="2" />
            <SelectOption label="3月" value="3" />
          </SelectGroup>
        </ComponentCard>

        <ComponentCard
          title="大きなプルダウン"
          description="見やすく押しやすい大きめサイズのプルダウンメニューです。"
          code={`<SelectGroup label="カテゴリ" size="large" fullWidth>
  <SelectOption label="写真" value="pictures" />
  <SelectOption label="動画" value="movies" />
  <SelectOption label="音声" value="audio" />
</SelectGroup>`}
        >
          <SelectGroup label="カテゴリ" size="large" fullWidth>
            <SelectOption label="写真" value="pictures" />
            <SelectOption label="動画" value="movies" />
            <SelectOption label="音声" value="audio" />
          </SelectGroup>
        </ComponentCard>

        <ComponentCard
          title="ヒント付きプルダウン"
          description="使い方の説明が表示されるプルダウンメニューです。"
          code={`<SelectGroup label="並び替え" helperText="表示順を選択してください" fullWidth>
  <SelectOption label="新しい順" value="newest" />
  <SelectOption label="古い順" value="oldest" />
  <SelectOption label="人気順" value="popular" />
</SelectGroup>`}
        >
          <SelectGroup
            label="並び替え"
            helperText="表示順を選択してください"
            fullWidth
          >
            <SelectOption label="新しい順" value="newest" />
            <SelectOption label="古い順" value="oldest" />
            <SelectOption label="人気順" value="popular" />
          </SelectGroup>
        </ComponentCard>

        <ComponentCard
          title="エラー時プルダウン"
          description="入力が必要な場合などに警告を表示するプルダウンです。"
          code={`<SelectGroup label="言語" error="このフィールドは必須です" fullWidth>
  <SelectOption label="日本語" value="ja" />
  <SelectOption label="英語" value="en" />
  <SelectOption label="中国語" value="zh" />
</SelectGroup>`}
        >
          <SelectGroup label="言語" error="このフィールドは必須です" fullWidth>
            <SelectOption label="日本語" value="ja" />
            <SelectOption label="英語" value="en" />
            <SelectOption label="中国語" value="zh" />
          </SelectGroup>
        </ComponentCard>

        <ComponentCard
          title="成功時プルダウン"
          description="選択が完了した際に確認メッセージを表示するプルダウンです。"
          code={`<SelectGroup label="プラン" success="ご選択ありがとうございます" fullWidth>
  <SelectOption label="スタンダード" value="standard" />
  <SelectOption label="プレミアム" value="premium" />
</SelectGroup>`}
        >
          <SelectGroup
            label="プラン"
            success="ご選択ありがとうございます"
            fullWidth
          >
            <SelectOption label="スタンダード" value="standard" />
            <SelectOption label="プレミアム" value="premium" />
          </SelectGroup>
        </ComponentCard>
      </div>
    </section>
  );
});

SelectGallery.displayName = "SelectGallery";
