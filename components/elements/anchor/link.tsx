import { ExternalLink, type LucideIcon } from "lucide-react";

import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import {
  type AnchorHTMLAttributes,
  type ForwardRefExoticComponent,
  forwardRef,
  type RefAttributes,
} from "react";

import { cn } from "@/styles/functions";

type LinkKind = "default" | "button" | "ghost";

type LinkSize = "small" | "default" | "large";

type MarkPosition = "left" | "right";

const isExternalUrl = (url: string): boolean => {
  return (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("//") ||
    url.startsWith("mailto:") ||
    url.startsWith("tel:") ||
    url.startsWith("ftp://") ||
    url.startsWith("file://") ||
    url.startsWith("sms:")
  );
};

export type LinkProps = {
  kind?: LinkKind;
  size?: LinkSize;
  mark?: LucideIcon | ForwardRefExoticComponent<RefAttributes<SVGSVGElement>>;
  markPosition?: MarkPosition;
  underline?: boolean;
  openInNewTab?: boolean;
  external?: boolean;
  fake?: boolean;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "target" | "rel"> &
  NextLinkProps;

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      href,
      kind = "default",
      size = "default",
      mark: Mark,
      markPosition = "left",
      underline = true,
      openInNewTab = false,
      external,
      fake = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const url = typeof href === "string" ? href : href.href || "";

    const isExternal = external !== undefined ? external : isExternalUrl(url);

    const enabledExternalMark = isExternal && !Mark;

    const targetProps = openInNewTab
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};

    const relProps = isExternal && !openInNewTab ? { rel: "noopener" } : {};

    const accessibilityProps = {
      "aria-label": openInNewTab
        ? `${props["aria-label"] || url || "リンク"}（新しいタブで開きます)`
        : isExternal
          ? `${props["aria-label"] || url || "リンク"}（外部サイト）`
          : props["aria-label"] || url || "リンク",
    };

    const baseStyles =
      "inline-flex items-center gap-2 w-fit rounded transition-all duration-200";

    const kindStyles = {
      default:
        "text-primary hover:text-primary/80 hover:scale-105 active:scale-100",
      button:
        "py-2 px-4 bg-brand text-foreground hover:bg-brand/90 active:bg-brand/80 shadow-sm focus:px-4 hover:shadow-md active:shadow-sm",
      ghost:
        "py-2 px-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 active:bg-primary/20 focus:px-4 hover:shadow-sm active:shadow-none",
    };

    const sizeStyles = {
      small: "text-sm",
      default: "text-base",
      large: "text-lg",
    };

    const markStyles = {
      small: "h-4 w-4 stroke-2 fill-brand/15",
      default: "h-5 w-5 stroke-2 fill-brand/15",
      large: "h-6 w-6 stroke-2 fill-brand/15",
    };

    const underlineStyles =
      underline && kind === "default"
        ? "underline decoration-2 underline-offset-4"
        : "";

    const classNames = cn(
      baseStyles,
      kindStyles[kind],
      sizeStyles[size],
      underlineStyles,
      className,
    );

    const content = (
      <>
        {Mark && markPosition === "left" && (
          <Mark className={markStyles[size]} aria-hidden="true" />
        )}
        <span>{children}</span>
        {Mark && markPosition === "right" && (
          <Mark className={markStyles[size]} aria-hidden="true" />
        )}
        {enabledExternalMark && (
          <ExternalLink className={markStyles[size]} aria-hidden="true" />
        )}
      </>
    );

    return !fake ? (
      <NextLink
        href={href}
        className={classNames}
        ref={ref}
        {...targetProps}
        {...relProps}
        {...accessibilityProps}
        {...props}
      >
        {content}
      </NextLink>
    ) : (
      <div className={cn(classNames, "cursor-pointer")} {...accessibilityProps}>
        {content}
      </div>
    );
  },
);

Link.displayName = "Link";
