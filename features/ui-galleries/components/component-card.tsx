import {
  type ComponentProps,
  type HTMLAttributes,
  memo,
  type ReactNode,
} from "react";
import { Description, Title } from "@/components/elements/typography";
import { cn } from "@/styles/functions";
import { CodeSnippet } from "./code-snippet";
import { CopyToClipboard } from "./copy-to-clipboard";

type ComponentCardProps = {
  title: string;
  description: string;
  code: string;
  language?: ComponentProps<typeof CodeSnippet>["language"];
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export const ComponentCard = memo<ComponentCardProps>(
  ({
    title,
    description,
    children,
    code,
    language = "tsx",
    className,
    ...props
  }) => (
    <div
      className={cn(
        "rounded-lg border border-outline bg-foundation shadow-sm",
        className,
      )}
      {...props}
    >
      <div className="flex h-32 flex-col gap-1.5 rounded-t-lg border-outline border-b bg-foundation p-5">
        <Title as="h3">{title}</Title>
        <Description size="small">
          <p>{description}</p>
        </Description>
      </div>

      <div className="flex h-58 items-center justify-center bg-foundation/30 px-6 py-8">
        {children}
      </div>

      <div className="rounded-b-lg bg-primary/5">
        <div className="flex items-center justify-between bg-primary/10 px-4 py-2">
          <span className="text-primary text-xs">{language}</span>
          <CopyToClipboard code={code} />
        </div>

        <div className="h-48 w-full overflow-hidden">
          <div className="h-full w-full overflow-auto p-4">
            <CodeSnippet
              code={code}
              language={language}
              className="text-primary text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  ),
);

ComponentCard.displayName = "ComponentCard";
