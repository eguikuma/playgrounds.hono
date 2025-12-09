import { useRouter } from "next/navigation";
import { memo, useCallback, useEffect } from "react";
import { Image } from "@/components/elements/symbol";
import { useKeyboard } from "@/hooks";
import { cn } from "@/styles/functions";
import type { AlbumCard } from "../../models/album";

type CardProps = {
  datum: AlbumCard;
};

export const Card = memo<CardProps>(({ datum = null }) => {
  const router = useRouter();

  const click = useCallback(
    () => (datum ? router.replace(`/albums/${datum.id}`) : null),
    [datum, router],
  );

  const { keydown } = useKeyboard({
    Enter: click,
  });

  useEffect(() => {
    if (datum) {
      router.prefetch(`/albums/${datum.id}`);
    }
  }, [datum, router]);

  return (
    datum && (
      <div
        className={cn(
          "relative flex w-full cursor-pointer flex-col overflow-hidden rounded-lg",
          "border border-outline bg-foundation shadow-sm transition-shadow duration-300 hover:shadow-md",
        )}
        role="link"
        onClick={click}
        onKeyDown={keydown}
        tabIndex={0}
        aria-label={`${datum.name || "アルバム"}を開く`}
      >
        <div className="absolute inset-0 z-skeleton w-full overflow-hidden rounded-lg">
          <div className="aspect-square bg-primary/20" />
          <div className="p-4">
            <div className="mb-2 h-5 rounded bg-primary/20" />
            <div className="h-4 w-1/2 rounded bg-primary/20" />
          </div>
        </div>
        <div className="relative z-content">
          <div className="relative aspect-square">
            <Image
              src={datum.thumbnailUrl}
              alt={datum.name || "アルバム"}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
          <div className="bg-foundation p-4">
            <h3 className="truncate font-medium text-lg text-primary">
              {datum.name}
            </h3>
            <p className="text-base text-secondary">{datum.count}枚の写真</p>
          </div>
        </div>
      </div>
    )
  );
});

Card.displayName = "Card";
