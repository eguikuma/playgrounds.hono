import { Home } from "lucide-react";
import { memo } from "react";

import { Link, LogoLink } from "@/components/elements/anchor";
import { Title } from "@/components/elements/typography";

import { ComponentCard } from "./component-card";

export const AnchorGallery = memo(() => {
  return (
    <section className="flex flex-col gap-4">
      <Title as="h2" accented>
        Anchor
      </Title>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        <ComponentCard
          title="標準リンク"
          description="基本的なテキストリンクです。"
          code={`<Link href="/">ホームへ戻る</Link>`}
        >
          <Link href="/" fake>
            ホームへ戻る
          </Link>
        </ComponentCard>

        <ComponentCard
          title="アイコン付きリンク"
          description="アイコン付きのリンクです。"
          code={`<Link href="/" mark={Home}>ホームへ戻る</Link>`}
        >
          <Link href="/" mark={Home} fake>
            ホームへ戻る
          </Link>
        </ComponentCard>

        <ComponentCard
          title="外部リンク"
          description="別サイトへのリンクには自動的にアイコンが表示されます。"
          code={`<Link href="https://example.com">外部サイトへ</Link>`}
        >
          <Link href="https://example.com" fake>
            外部サイトへ
          </Link>
        </ComponentCard>

        <ComponentCard
          title="ボタン風リンク"
          description="ボタンのように目立つスタイルのリンクです。"
          code={`<Link href="/" kind="button">ボタン風リンク</Link>`}
        >
          <Link href="/" kind="button" fake>
            ボタン風リンク
          </Link>
        </ComponentCard>

        <ComponentCard
          title="薄色リンク"
          description="控えめな色合いの背景付きリンクです。"
          code={`<Link href="/" kind="ghost">薄色リンク</Link>`}
        >
          <Link href="/" kind="ghost" fake>
            薄色リンク
          </Link>
        </ComponentCard>

        <ComponentCard
          title="ロゴリンク"
          description="ロゴと名前の組み合わせリンクです。"
          code={`<LogoLink />`}
        >
          <LogoLink className="[&>span>span]:block" fake />
        </ComponentCard>

        <ComponentCard
          title="ロゴのみリンク"
          description="ロゴのみのコンパクトなリンクです。"
          code={`<LogoLink markOnly />`}
        >
          <LogoLink markOnly fake />
        </ComponentCard>
      </div>
    </section>
  );
});

AnchorGallery.displayName = "AnchorGallery";
