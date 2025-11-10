"use client";

import { Ellipsis } from "lucide-react";
import { memo } from "react";

import { Description, Title } from "@/components/elements/typography";
import { useContrast, useEnabledWindow, useTheme } from "@/hooks";
import { varsToHex } from "@/styles/functions";

type Color = {
  name: string;
  category: string;
  description: string;
  className: string;
  cssVar: string;
};

const colors: Color[] = [
  {
    name: "ベースカラー",
    category: "背景色",
    description: "ページ全体のトーンに使用されます",
    className: "bg-foundation",
    cssVar: "--color-foundation",
  },
  {
    name: "ブランドカラー",
    category: "背景色",
    description: "特に重要な要素へ注目させるために使用されます",
    className: "bg-brand",
    cssVar: "--color-brand",
  },
  {
    name: "アクセントカラー",
    category: "背景色",
    description: "ブラントカラーを強調するために使用されます",
    className: "bg-accent",
    cssVar: "--color-accent",
  },
  {
    name: "プライマリーカラー",
    category: "文字色",
    description: "タイトルや本文などの基本的なテキストに使用されます",
    className: "bg-primary",
    cssVar: "--color-primary",
  },
  {
    name: "セカンダリーカラー",
    category: "文字色",
    description: "説明文やヒントなどの補助的なテキストに使用されます",
    className: "bg-secondary",
    cssVar: "--color-secondary",
  },
  {
    name: "フォアグラウンドカラー",
    category: "文字色",
    description: "濃い背景色の上へ配置されるテキストに使用されます",
    className: "bg-foreground",
    cssVar: "--color-foreground",
  },
  {
    name: "サクセスカラー",
    category: "背景色",
    description: "操作の成功や完了を伝えるために使用されます",
    className: "bg-success",
    cssVar: "--color-success",
  },
  {
    name: "エラーカラー",
    category: "背景色",
    description: "操作の失敗やエラーを伝えるために使用されます",
    className: "bg-error",
    cssVar: "--color-error",
  },
  {
    name: "フォーカスカラー",
    category: "区切り色",
    description: "現在選んでいる項目や入力中の場所を強調するために使用されます",
    className: "bg-focus",
    cssVar: "--color-focus",
  },
  {
    name: "アウトラインカラー",
    category: "区切り色",
    description: "要素の境界を明確にするために使用されます",
    className: "bg-outline",
    cssVar: "--color-outline",
  },
  {
    name: "トラックカラー",
    category: "区切り色",
    description: "スライダーやプログレスバーの背景に使用されます",
    className: "bg-track",
    cssVar: "--color-track",
  },
];

export const ColorsInUse = memo(() => {
  const enabled = useEnabledWindow();

  useTheme();
  useContrast();

  return (
    <section className="flex flex-col gap-4">
      <Title as="h2" accented>
        一覧
      </Title>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
        {colors.map((color) => (
          <div
            key={color.cssVar}
            className="group/card flex flex-col overflow-hidden rounded-lg border border-outline transition-all duration-300 hover:shadow-lg"
          >
            <div
              className={`h-32 ${color.className} relative flex items-end justify-end border-outline border-b transition-all duration-300 group-hover/card:h-36`}
            >
              <div className="absolute top-3 left-3 rounded border border-outline bg-foundation px-2 py-1 font-medium text-primary text-xs shadow-sm">
                {color.category}
              </div>
              <div className="m-3 rounded border border-outline bg-foundation px-2 py-1 font-mono text-primary text-xs shadow-sm">
                {enabled ? (
                  varsToHex(color.cssVar)
                ) : (
                  <Ellipsis className="h-4 w-4" />
                )}
              </div>
            </div>

            <div className="flex min-h-45 flex-1 flex-col justify-between gap-4 bg-foundation p-5">
              <div className="flex flex-col gap-1.5">
                <Title as="h3" className="flex items-center gap-2">
                  <span
                    className={`inline-block h-3 w-3 rounded-full ${color.className} border border-outline`}
                  />
                  {color.name}
                </Title>
                <Description size="small">
                  <p>{color.description}</p>
                </Description>
              </div>

              <div className="flex justify-start">
                <code className="rounded border border-outline bg-foundation px-3 py-1.5 font-mono text-primary text-xs">
                  {color.cssVar}
                </code>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

ColorsInUse.displayName = "ColorsInUse";
