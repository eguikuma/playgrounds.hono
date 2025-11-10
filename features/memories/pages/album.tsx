"use client";

import { LoaderCircle } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useToggle } from "react-use";
import { Description, Title } from "@/components/elements/typography";
import { Container } from "@/components/structures";
import { PullToRefresh } from "@/components/tools";
import { useInfinityScroll } from "@/hooks/use-infinity-scroll";
import { cn } from "@/styles/functions";
import { Cards } from "../components/pictures/cards";
import type { AlbumDescription } from "../models/album";
import type { PictureCard } from "../models/picture";
import repositories from "../repositories";

type Props = {
  id: string;
};

export const Album = ({ id }: Props) => {
  const [open, toggle] = useToggle(false);
  const [datum, setDatum] = useState<AlbumDescription>();

  const fetcher = useCallback(
    async (offset: number, limit: number) =>
      await repositories.pictures.list({
        albumId: id,
        offset,
        limit,
      }),
    [id],
  );

  const { data, meta, loading, trigger, load, refresh } =
    useInfinityScroll<PictureCard>({
      fetcher,
    });

  useEffect(() => {
    (async () => {
      setDatum(await repositories.albums.get({ id }));
    })();
  }, [id]);

  return datum && data && meta ? (
    <PullToRefresh onRefresh={refresh}>
      <Container className="h-[calc(100%-4rem)] md:h-[calc(100%-4.5rem)]">
        <div className={cn("flex flex-col gap-4", open ? "hidden" : "flex")}>
          <Title as="h1">{datum.title}</Title>
          <Description>
            <p className="flex items-center gap-x-1">
              {meta.count}枚の写真があります。
            </p>
            <p>写真をタップすると大きく表示されます。</p>
          </Description>
        </div>

        <div className="flex flex-col">
          <div className="mb-20 md:mb-24 lg:mb-28">
            <Cards
              data={data}
              albumId={id}
              open={open}
              loading={loading}
              toggle={toggle}
              refresh={refresh}
              load={load}
              more={meta.next.more}
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
  ) : (
    <div className="flex items-center justify-center">
      <LoaderCircle className="h-12 w-12 animate-spin" />
    </div>
  );
};
