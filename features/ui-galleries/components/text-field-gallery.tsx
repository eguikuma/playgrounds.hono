"use client";

import { Mail, Search } from "lucide-react";
import { memo } from "react";

import { Input, Textarea } from "@/components/elements/text-field";
import { Title } from "@/components/elements/typography";

import { ComponentCard } from "./component-card";

export const TextFieldGallery = memo(() => {
  return (
    <section className="flex flex-col gap-4">
      <Title as="h2" accented>
        TextField
      </Title>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        <ComponentCard
          title="標準入力欄"
          description="一行のテキストを入力するための基本的な入力欄です。"
          code={`<Input label="名前" placeholder="山田 太郎" fullWidth />`}
        >
          <Input label="名前" placeholder="山田 太郎" fullWidth />
        </ComponentCard>

        <ComponentCard
          title="アイコン付き入力欄"
          description="内容を示すアイコン付きの入力欄です。"
          code={`<Input label="メールアドレス" placeholder="example@mail.com" mark={Mail} fullWidth />`}
        >
          <Input
            label="メールアドレス"
            placeholder="example@mail.com"
            mark={Mail}
            fullWidth
          />
        </ComponentCard>

        <ComponentCard
          title="ヒント付き入力欄"
          description="入力方法の説明が表示される入力欄です。"
          code={`<Input label="検索" placeholder="キーワードを入力" mark={Search} helperText="検索したい言葉を入力してください" fullWidth />`}
        >
          <Input
            label="検索"
            placeholder="キーワードを入力"
            mark={Search}
            helperText="検索したい言葉を入力してください"
            fullWidth
          />
        </ComponentCard>

        <ComponentCard
          title="エラー時入力欄"
          description="入力内容に問題がある場合のエラー表示付き入力欄です。"
          code={`<Input label="ユーザー名" placeholder="山田 太郎" error="このユーザー名は既に使用されています" fullWidth />`}
        >
          <Input
            label="ユーザー名"
            placeholder="山田 太郎"
            error="このユーザー名は既に使用されています"
            fullWidth
          />
        </ComponentCard>

        <ComponentCard
          title="成功時入力欄"
          description="入力内容が適切な場合の成功メッセージ付き入力欄です。"
          code={`<Input label="ユーザー名" placeholder="piyopiyo" defaultValue="puyopuyo" success="このユーザー名は使用可能です" fullWidth />`}
        >
          <Input
            label="ユーザー名"
            placeholder="piyopiyo"
            defaultValue="puyopuyo"
            success="このユーザー名は使用可能です"
            fullWidth
          />
        </ComponentCard>

        <ComponentCard
          title="複数行入力欄"
          description="長い文章を入力するための複数行テキスト入力欄です。"
          code={`<Textarea label="自己紹介" placeholder="自己紹介を入力してください" fullWidth />`}
        >
          <Textarea
            label="自己紹介"
            placeholder="自己紹介を入力してください"
            fullWidth
          />
        </ComponentCard>

        <ComponentCard
          title="文字数カウンター付き入力欄"
          description="入力した文字数が表示される複数行入力欄です。"
          code={`<Textarea label="コメント" placeholder="コメントを入力してください" counter maxLength={100} fullWidth />`}
        >
          <Textarea
            label="コメント"
            placeholder="コメントを入力してください"
            counter
            maxLength={100}
            fullWidth
          />
        </ComponentCard>

        <ComponentCard
          title="自動高さ調整付き入力欄"
          description="入力量に合わせて高さが自動調整される入力欄です。"
          code={`<Textarea label="メモ" placeholder="メモを入力してください" autoResize minRows={2} maxRows={2} fullWidth />`}
        >
          <Textarea
            label="メモ"
            placeholder="メモを入力してください"
            autoResize
            minRows={2}
            maxRows={4}
            fullWidth
          />
        </ComponentCard>
      </div>
    </section>
  );
});

TextFieldGallery.displayName = "TextFieldGallery";
