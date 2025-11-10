"use client";

import { Eye, EyeOff, Heart, Home, Settings } from "lucide-react";
import { memo, useState } from "react";

import {
  AsyncButton,
  Button,
  Mark,
  Toggle,
} from "@/components/elements/trigger";
import { Title } from "@/components/elements/typography";

import { ComponentCard } from "./component-card";

export const TriggerGallery = memo(() => {
  return (
    <section className="flex flex-col gap-4">
      <Title as="h2" accented>
        Trigger
      </Title>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        <ComponentCard
          title="メインボタン"
          description="重要な操作を実行するための目立つボタンです。"
          code={`<Button>
  保存する
</Button>`}
        >
          <Button>保存する</Button>
        </ComponentCard>

        <ComponentCard
          title="サブボタン"
          description="補助的な操作のための控えめなボタンです。"
          code={`<Button kind="secondary">
  キャンセル
</Button>`}
        >
          <Button kind="secondary">キャンセル</Button>
        </ComponentCard>

        <ComponentCard
          title="アイコン付きボタン"
          description="アイコン付きのボタンです。"
          code={`<Button mark={Home}>
  ホーム
</Button>`}
        >
          <Button mark={Home}>ホーム</Button>
        </ComponentCard>

        <ComponentCard
          title="大きなボタン"
          description="タッチしやすい大きめサイズのボタンです。"
          code={`<Button size="large">
  大きなボタン
</Button>`}
        >
          <Button size="large">大きなボタン</Button>
        </ComponentCard>

        <ComponentCard
          title="成功時ボタン"
          description="処理状況と成功したことが分かるボタンです。"
          code={`<AsyncButton
  onClick={async () => await new Promise(resolve => setTimeout(resolve, 1000))}
>
  保存する
</AsyncButton>`}
        >
          <AsyncButton
            onClick={async () =>
              await new Promise((resolve) => setTimeout(resolve, 1000))
            }
          >
            保存する
          </AsyncButton>
        </ComponentCard>

        <ComponentCard
          title="失敗時ボタン"
          description="処理状況と失敗したことが分かるボタンです。"
          code={`<AsyncButton
  onClick={async () => await new Promise((_, reject) => setTimeout(reject, 1000))}
>
  保存する
</AsyncButton>`}
        >
          <AsyncButton
            onClick={async () =>
              await new Promise((_, reject) => setTimeout(reject, 1000))
            }
          >
            保存する
          </AsyncButton>
        </ComponentCard>

        <ComponentCard
          title="アイコンボタン"
          description="アイコンのみのコンパクトなボタンです。"
          code={`<Mark value={Heart} aria-label="お気に入り" />`}
        >
          <Mark value={Heart} aria-label="お気に入り" />
        </ComponentCard>

        <ComponentCard
          title="塗りつぶしアイコンボタン"
          description="選択中や有効状態を示す塗りつぶし表示のアイコンボタンです。"
          code={`<Mark value={Heart} filled aria-label="お気に入り" />`}
        >
          <Mark value={Heart} filled aria-label="お気に入り" />
        </ComponentCard>

        <ComponentCard
          title="ヒント付きアイコンボタン"
          description="機能説明のヒントが表示されるアイコンボタンです。"
          code={`<Mark value={Settings} tooltip="設定" aria-label="設定" />`}
        >
          <Mark value={Settings} tooltip="設定" aria-label="設定" />
        </ComponentCard>

        <ComponentCard
          title="切り替えアイコンボタン"
          description="オンとオフを切り替えるためのアイコンボタンです。"
          code={`<Mark size="large" value={checked ? Eye : EyeOff} onClick={toggle} aria-label="表示" />`}
        >
          {(() => {
            /* biome-ignore lint/correctness/useHookAtTopLevel: https://biomejs.dev/ja/linter/rules/use-hook-at-top-level/ */
            const [checked, setChecked] = useState(true);

            const toggle = () => setChecked(!checked);

            return (
              <Mark
                size="large"
                value={checked ? Eye : EyeOff}
                onClick={toggle}
                aria-label="表示"
              />
            );
          })()}
        </ComponentCard>

        <ComponentCard
          title="切り替えスイッチ"
          description="オンとオフを切り替えるためのスイッチです。"
          code={`<Toggle label="通知を受け取る" />`}
        >
          <Toggle label="通知を受け取る" />
        </ComponentCard>

        <ComponentCard
          title="大きな切り替えスイッチ"
          description="タッチしやすい大きめサイズの切り替えスイッチです。"
          code={`<Toggle size="large" label="通知を受け取る" />`}
        >
          <Toggle size="large" label="通知を受け取る" />
        </ComponentCard>
      </div>
    </section>
  );
});

TriggerGallery.displayName = "TriggerGallery";
