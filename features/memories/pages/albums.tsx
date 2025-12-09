"use client";

import { LoaderCircle } from "lucide-react";
import { useCallback } from "react";
import { useToggle } from "react-use";
import { Description, Title } from "@/components/elements/typography";
import { Container } from "@/components/structures";
import { PullToRefresh } from "@/components/tools";
import { useInfinityScroll } from "@/hooks/use-infinity-scroll";
import { cn } from "@/styles/functions";
import { Cards } from "../components/albums/cards";
import type { AlbumCard } from "../models/album";
import repositories from "../repositories";

export const Albums = () => {
  const [open, toggle] = useToggle(false);

  const fetcher = useCallback(
    async (offset: number, limit: number) =>
      await repositories.albums.list({ offset, limit }),
    [],
  );

  const { data, loading, trigger, refresh } = useInfinityScroll<AlbumCard>({
    fetcher,
  });

  return (
    <PullToRefresh onRefresh={refresh}>
      <Container>
        <div className={cn("flex flex-col gap-4", open ? "hidden" : "flex")}>
          <Title as="h1">アルバム一覧</Title>
          <Description>
            <p>大切な思い出の写真をアルバムでまとめています。</p>
            <p>アルバムをタップすると、中の写真を見ることができます。</p>
          </Description>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-col gap-4">
            <Cards
              data={data}
              open={open}
              loading={loading}
              toggle={toggle}
              refresh={refresh}
            />
            {loading && !open && (
              <div className="flex items-center justify-center">
                <LoaderCircle className="h-12 w-12 animate-spin" />
              </div>
            )}
          </div>
          <div ref={trigger} className="h-px" />
        </div>
      </Container>
    </PullToRefresh>
  );
};
