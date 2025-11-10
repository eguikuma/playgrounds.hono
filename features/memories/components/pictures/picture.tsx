import { memo } from "react";
import { Image } from "@/components/elements/symbol";

type PictureProps = {
  url: string;
  takenAt: string;
};

export const Picture = memo<PictureProps>(({ url, takenAt }) => (
  <Image
    src={url}
    alt={`${takenAt}の写真`}
    className="max-h-full max-w-full object-contain"
    fill
    priority={true}
  />
));

Picture.displayName = "Picture";
