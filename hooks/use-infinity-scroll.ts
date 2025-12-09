"use client";

import { uniqBy } from "es-toolkit/array";
import { debounce } from "es-toolkit/function";
import { useCallback, useEffect, useRef, useState } from "react";

type Meta = {
  count: number;
  next: {
    more: boolean;
    offset: number | null;
  };
};

type InfinityScrollOptions<Datum> = {
  fetcher: (
    offset: number,
    limit: number,
  ) => Promise<{ data: Datum[]; meta: Meta }>;
  limit?: number;
};

export const useInfinityScroll = <Datum extends { id: string | number }>({
  fetcher,
  limit = 4,
}: InfinityScrollOptions<Datum>) => {
  const [data, setData] = useState<Datum[]>([]);
  const [loading, setLoading] = useState(true);

  const fetching = useRef(true);
  const refreshing = useRef(false);
  const meta = useRef<Meta | null>(null);
  const trigger = useRef<HTMLDivElement | null>(null);

  const fetch = useCallback(
    async (force = false) => {
      if (
        (fetching.current && !force) ||
        refreshing.current ||
        (meta.current && !meta.current.next.more) ||
        (meta.current && meta.current.next.offset === null)
      )
        return;

      try {
        fetching.current = true;

        setLoading(true);

        const response = await fetcher(
          meta.current && meta.current.next.offset
            ? meta.current.next.offset
            : 0,
          limit,
        );

        setData((previous) =>
          uniqBy([...previous, ...response.data], ({ id }) => id),
        );

        meta.current = response.meta;
      } catch (e) {
        console.error("🔥 データの読み込みに失敗しました", e);
      } finally {
        fetching.current = false;

        setLoading(false);
      }
    },
    [fetcher, limit],
  );

  const load = useCallback(
    (milliseconds = 500) =>
      debounce(() => {
        fetch();
      }, milliseconds)(),
    [fetch],
  );

  const refresh = useCallback(async () => {
    if (fetching.current || refreshing.current) return;

    refreshing.current = true;

    setData([]);
    meta.current = {
      count: 0,
      next: {
        more: true,
        offset: 0,
      },
    };

    await fetch();

    refreshing.current = false;
  }, [fetch]);

  const start = useCallback(async () => await fetch(true), [fetch]);

  useEffect(() => {
    if (!trigger.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          !entries[0].isIntersecting ||
          fetching.current ||
          refreshing.current
        )
          return;

        load();
      },
      {
        threshold: 0,
        rootMargin: "10%",
      },
    );

    observer.observe(trigger.current);

    return () => observer.disconnect();
  }, [load]);

  useEffect(() => {
    const timeout = setInterval(() => {
      if (!trigger.current || fetching.current || refreshing.current) return;

      if (trigger.current.getBoundingClientRect().top <= window.innerHeight) {
        load();
      }
    }, 500);

    return () => timeout && clearInterval(timeout);
  }, [load]);

  useEffect(() => {
    start();
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  return {
    data,
    meta: meta.current,
    loading,
    trigger,
    load,
    refresh,
  };
};
