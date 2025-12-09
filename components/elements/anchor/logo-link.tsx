import { forwardRef, type HTMLAttributes } from "react";

import { cn } from "@/styles/functions";

import { Logo } from "../symbol";
import { Link, type LinkProps } from "./link";

type LogoLinkProps = {
  size?: LinkProps["size"];
  markOnly?: boolean;
  fake?: boolean;
} & HTMLAttributes<HTMLAnchorElement>;

export const LogoLink = forwardRef<HTMLAnchorElement, LogoLinkProps>(
  ({ size = "default", markOnly = false, className, ...props }, ref) => {
    const sizeStyles = {
      small: "text-base",
      default: "text-lg",
      large: "text-xl",
    };

    return (
      <div className="flex items-center">
        <Link
          ref={ref}
          href="/"
          kind="default"
          mark={Logo}
          size={size}
          className={cn("flex flex-row items-center gap-2", className)}
          underline={false}
          aria-label="おうちずかんのトップページへ戻る"
          prefetch={false}
          {...props}
        >
          {!markOnly && (
            <span
              className={cn(
                "hidden font-bold tracking-wider md:block",
                sizeStyles[size],
                "text-primary",
              )}
            >
              おうちずかん
            </span>
          )}
        </Link>
      </div>
    );
  },
);

LogoLink.displayName = "LogoLink";
