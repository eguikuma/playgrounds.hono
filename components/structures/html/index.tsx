import { memo, type PropsWithChildren } from "react";

type HtmlProps = PropsWithChildren<{
  lang?: string;
}>;

export const Html = memo<HtmlProps>(({ lang = "ja", children }) => (
  <html lang={lang} className="h-full overflow-hidden" suppressHydrationWarning>
    {children}
  </html>
));

Html.displayName = "Html";
