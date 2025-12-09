"use client";

import { ImageOff, Upload as UploadIcon } from "lucide-react";
import {
  Fragment,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Button } from "@/components/elements/trigger";
import { Covered, Footer } from "@/components/structures";
import { usePullToRefresh } from "@/hooks";
import { cn } from "@/styles/functions";
import type { PictureCard } from "../../models/picture";
import { Card } from "./card";
import { Upload } from "./upload";
import { Viewer } from "./viewer";

const PrefetchThreshold = 3;

type CardsProps = {
  albumId: string;
  data: PictureCard[];
  open: boolean;
  loading: boolean;
  more: boolean;
  toggle: () => void;
  load: () => void;
  refresh: () => void;
};

export const Cards = memo<CardsProps>(
  ({ albumId, data, open, loading, more, toggle, load, refresh }) => {
    const [selected, setSelected] = useState<number | null>(null);
    const { on, off } = usePullToRefresh();

    const hasNext = useMemo(
      () => data && selected !== null && selected < data.length - 1,
      [data, selected],
    );

    const hasPrevious = useMemo(
      () => selected !== null && selected > 0,
      [selected],
    );

    const select = useCallback(
      (index: number) => {
        setSelected(index);

        off();
      },
      [off],
    );

    const reset = useCallback(() => {
      setSelected(null);

      on();
    }, [on]);

    const next = useCallback(
      () =>
        setSelected((current) => {
          if (current === null || !data || current >= data.length - 1)
            return current;

          return current + 1;
        }),
      [data],
    );

    const previous = useCallback(
      () =>
        setSelected((current) => {
          if (current === null || current <= 0) return current;

          return current - 1;
        }),
      [],
    );

    useEffect(() => {
      if (selected === null || !more) return;

      if (data.length - selected <= PrefetchThreshold) {
        load();
      }
    }, [selected, data.length, more, load]);

    return (
      <div className="flex flex-col">
        <div className={cn("flex flex-col gap-4", open ? "hidden" : "flex")}>
          <div className="flex justify-end">
            <Button onClick={toggle} mark={UploadIcon}>
              写真をアップロード
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {data.length > 0
              ? data.map((datum, index) => (
                  <Fragment key={datum.id}>
                    <Card datum={datum} onClick={() => select(index)} />
                  </Fragment>
                ))
              : !loading && (
                  <div
                    className={cn(
                      "col-span-full flex flex-col items-center justify-center gap-2 py-8 text-center text-secondary",
                    )}
                  >
                    <ImageOff className="h-12 w-12" />
                    <p>写真がありません</p>
                  </div>
                )}
          </div>
          {selected !== null && (
            <Viewer
              datum={data[selected]}
              onClose={reset}
              onNext={hasNext ? next : undefined}
              onPrevious={hasPrevious ? previous : undefined}
            />
          )}
          <Footer to="/albums" fixed />
        </div>

        {open && (
          <Covered>
            <Upload albumId={albumId} onClose={toggle} onSuccess={refresh} />
          </Covered>
        )}
      </div>
    );
  },
);

Cards.displayName = "Cards";
