import { memo, type PropsWithChildren } from "react";

export const Body = memo<PropsWithChildren>(({ children }) => (
  <body className="flex h-full flex-col bg-foundation text-primary antialiased">
    {children}
  </body>
));

Body.displayName = "Body";
