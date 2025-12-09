import { FolderOpen, FolderPlus } from "lucide-react";
import { memo } from "react";
import { Button } from "@/components/elements/trigger";
import { Covered } from "@/components/structures";
import { cn } from "@/styles/functions";
import type { AlbumCard } from "../../models/album";
import { Card } from "./card";
import { Create } from "./create";

type CardsProps = {
  data: AlbumCard[];
  open: boolean;
  loading: boolean;
  toggle: () => void;
  refresh: () => void;
};

export const Cards = memo<CardsProps>(
  ({ data, open, loading, toggle, refresh }) => {
    return (
      <div className="flex flex-col">
        <div className={cn("flex flex-col gap-4", open ? "hidden" : "flex")}>
          <div className="flex justify-end">
            <Button onClick={toggle} mark={FolderPlus}>
              アルバムを作成
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {data.length > 0
              ? data.map((datum) => <Card key={datum.id} datum={datum} />)
              : !loading && (
                  <div className="col-span-full flex flex-col items-center justify-center gap-2 py-8 text-center text-secondary">
                    <FolderOpen className="h-12 w-12" />
                    <p>アルバムがありません</p>
                  </div>
                )}
          </div>
        </div>

        {open && (
          <Covered>
            <Create onClose={toggle} onSuccess={refresh} />
          </Covered>
        )}
      </div>
    );
  },
);

Cards.displayName = "Cards";
