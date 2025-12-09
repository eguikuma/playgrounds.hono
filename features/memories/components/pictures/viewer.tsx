import { AlertTriangle, Camera } from "lucide-react";
import { memo } from "react";
import { Button } from "@/components/elements/trigger";
import { Footer, Header } from "@/components/structures";
import { useKeyboard } from "@/hooks";
import { toJaYYYYMMDD } from "@/services/date";
import { cn } from "@/styles/functions";
import type { PictureCard } from "../../models/picture";
import { Picture } from "./picture";

type ViewerProps = {
  datum: PictureCard;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
};

export const Viewer = memo<ViewerProps>(
  ({ datum, onClose, onNext, onPrevious }) => {
    const { keydown } = useKeyboard(
      {
        Escape: onClose,
        ArrowRight: onNext,
        ArrowLeft: onPrevious,
      },
      { global: true },
    );

    return (
      <div
        className={cn(
          "fullscreen fixed inset-0 z-fullscreen flex flex-col bg-foundation",
        )}
        role="dialog"
        onKeyDown={keydown}
      >
        <Header className="relative">
          <p className="flex items-center gap-2 font-bold">
            <Camera className="inline-block h-4 w-4" />
            <span>{toJaYYYYMMDD(datum.takenAt)}</span>
          </p>
        </Header>

        <div className="relative flex flex-1 items-center justify-center">
          {datum ? (
            <>
              <div
                className={cn(
                  "relative flex h-full w-full items-center justify-center transition-opacity duration-300 ease-in-out",
                )}
              >
                <Picture url={datum.originalUrl} takenAt={datum.takenAt} />
              </div>

              <div
                className={cn(
                  "-translate-y-1/2 absolute mx-auto flex w-full items-center justify-between px-4 md:px-6 lg:px-8",
                  "top-auto bottom-[-0.5rem]",
                  "md:top-1/2 md:bottom-auto",
                )}
              >
                <Button
                  className="mr-auto"
                  kind="secondary"
                  disabled={!onPrevious}
                  onClick={onPrevious}
                  aria-label="前の写真"
                >
                  <span>前へ</span>
                </Button>

                <Button
                  className="ml-auto"
                  kind="secondary"
                  disabled={!onNext}
                  onClick={onNext}
                  aria-label="次の写真"
                >
                  <span>次へ</span>
                </Button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 text-foreground">
              <AlertTriangle className="h-12 w-12" />
              <p className="text-lg">写真の読み込みに失敗しました</p>
            </div>
          )}
        </div>

        <Footer to={onClose} />
      </div>
    );
  },
);

Viewer.displayName = "Viewer";
