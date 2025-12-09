"use client";

import { Check, Clipboard } from "lucide-react";
import { memo, useCallback, useState } from "react";
import { sleep } from "@/services/timer";

type CopyToClipboardProps = {
  code: string;
};

export const CopyToClipboard = memo<CopyToClipboardProps>(({ code }) => {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    await navigator.clipboard.writeText(code);

    setCopied(true);

    await sleep(2000);

    setCopied(false);
  }, [code]);

  return (
    <button
      type="button"
      className="flex items-center gap-1 rounded-md px-2 py-1 text-secondary hover:bg-primary/15 hover:text-primary"
      onClick={copy}
      aria-label="コードをコピー"
    >
      {copied ? (
        <Check className="h-4 w-4" />
      ) : (
        <Clipboard className="h-4 w-4" />
      )}
      <span className="text-xs">{copied ? "コピーしました" : "コピー"}</span>
    </button>
  );
});

CopyToClipboard.displayName = "CopyToClipboard";
