"use client";

import { memo } from "react";

import { Title } from "@/components/elements/typography";
import { useContrast, useEnabledWindow, useTheme } from "@/hooks";
import { evaluateContrast, varsToHex } from "@/styles/functions";

type Evaluation = {
  name: string;
  description: string;
  background: string;
  foreground: string;
};

const evaluations: Evaluation[] = [
  {
    name: "基本テキスト",
    description: "アプリケーションの基本的なテキストです",
    background: "--color-foundation",
    foreground: "--color-primary",
  },
  {
    name: "補助テキスト",
    description: "アプリケーションの補助的なテキストです",
    background: "--color-foundation",
    foreground: "--color-secondary",
  },
  {
    name: "主要ボタン",
    description: "「保存」や「次へ」など、ユーザーの主要アクションを促します",
    background: "--color-brand",
    foreground: "--color-foreground",
  },
  {
    name: "補助ボタン",
    description:
      "「キャンセル」や「前へ」など、ユーザーの補助アクションを促します",
    background: "--color-accent",
    foreground: "--color-foreground",
  },
  {
    name: "成功メッセージ",
    description:
      "操作が完了したことをユーザーへ通知する肯定的なフィードバックを表します",
    background: "--color-success",
    foreground: "--color-foreground",
  },
  {
    name: "エラーメッセージ",
    description:
      "操作が失敗したことをユーザーへ通知する否定的なフィードバックを表します",
    background: "--color-error",
    foreground: "--color-foreground",
  },
];

export const ContrastEvaluation = memo(() => {
  const enabled = useEnabledWindow();

  useTheme();
  useContrast();

  return (
    <section className="flex flex-col gap-4">
      <Title as="h2" accented>
        評価
      </Title>
      {enabled && (
        <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2 lg:gap-8">
          {evaluations.map((evaluation) => {
            const evaluated = evaluateContrast(
              varsToHex(evaluation.foreground),
              varsToHex(evaluation.background),
            );

            return (
              <div
                key={evaluation.name}
                className="group/card flex flex-col overflow-hidden rounded-lg border border-outline transition-all duration-300 hover:shadow-lg"
              >
                <div
                  className="relative flex flex-col items-center justify-center gap-2 border-outline border-b px-6 py-10 transition-all duration-300 group-hover/card:py-12"
                  style={{
                    backgroundColor: varsToHex(evaluation.background),
                    color: varsToHex(evaluation.foreground),
                  }}
                >
                  <span className="text-center font-bold text-xl">
                    {evaluation.name}
                  </span>
                  <span className="text-center text-sm">
                    {evaluation.description}
                  </span>
                </div>

                <div className="flex flex-col gap-5 bg-foundation p-5">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between rounded-lg border border-outline bg-foundation p-3">
                      <div className="flex flex-col gap-1">
                        <span className="font-medium text-secondary text-xs">
                          視認性スコア
                        </span>
                        <div className="flex items-baseline gap-1 text-primary">
                          <span className="font-bold text-xl">
                            {evaluated.ratio.toFixed(2)}
                          </span>
                          <span className="text-secondary text-xs">/10</span>
                        </div>
                      </div>
                      <div
                        className="flex items-center gap-2 rounded-full px-4 py-2 font-bold text-foreground text-sm shadow-sm"
                        style={{ backgroundColor: evaluated.color }}
                      >
                        {evaluated.badge}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="h-3 overflow-hidden rounded-full border border-outline bg-outline/10">
                        <div
                          className="h-full rounded-full transition-all duration-300"
                          style={{
                            width: `${Math.min(100, (evaluated.ratio / 10) * 100)}%`,
                            backgroundColor: evaluated.color,
                          }}
                        />
                      </div>

                      <p className="flex items-center gap-2 text-secondary text-xs">
                        <span
                          className="inline-block h-3 w-3 rounded-full border border-outline"
                          style={{ backgroundColor: evaluated.color }}
                        />
                        <span>{evaluated.description}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
});

ContrastEvaluation.displayName = "ContrastEvaluation";
