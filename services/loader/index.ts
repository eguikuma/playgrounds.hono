import type { ImageLoaderProps } from "next/image";
import { env } from "../env/client";

/**
 * @see https://developers.cloudflare.com/images/transform-images/integrate-with-frameworks
 * @see https://opennext.js.org/cloudflare/howtos/image
 */
const image = ({ src, width, quality }: ImageLoaderProps) => {
  if (env.APP_DEBUG) {
    return src;
  }

  if (src.startsWith("http")) {
    return src;
  }

  const queries: string[] = [`width=${width}`];
  if (quality) {
    queries.push(`quality=${quality}`);
  }

  return `/cdn-cgi/image/${queries.join(",")}/${
    src.startsWith("/") ? src.slice(1) : src
  }`;
};

export default image;
