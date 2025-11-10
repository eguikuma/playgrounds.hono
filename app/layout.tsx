import type { ReactNode } from "react";

import "@/styles/globals.css";
import type { Metadata, Viewport } from "next";

import {
  Body,
  Header,
  Html,
  Outlet,
  Unsupported,
} from "@/components/structures";
import { TransitionProgress } from "@/components/tools";

export const metadata: Metadata = {
  title: {
    template: "%s | おうちずかん",
    default: "おうちずかん",
  },
  description: "おうちの大切な瞬間を記録する家族のずかん",
  applicationName: "おうちずかん",
  keywords: ["家族", "写真", "動画", "アルバム"],
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  robots: {
    index: false,
    googleBot: {
      index: false,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: true,
  viewportFit: "cover",
};

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <Html lang="ja">
      <head>
        {/* eslint-disable @next/next/no-sync-scripts */}
        {/* レンダリング前に適用させたい処理のため`defer`や`async`を使用していません。 */}
        <script src="/scripts/sync-accessibility.js" />
        <script src="/scripts/sync-status-bar.js" />
      </head>
      <Body>
        <Unsupported />
        <TransitionProgress />
        <Header />
        <Outlet>{children}</Outlet>
      </Body>
    </Html>
  );
}
