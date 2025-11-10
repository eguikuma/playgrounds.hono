export const toThumbnail = async (
  file: File,
  width = 300,
  height = 300,
  quality = 0.8,
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const canvas =
      typeof OffscreenCanvas !== "undefined"
        ? new OffscreenCanvas(width, height)
        : document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (
      !context ||
      !(
        context instanceof CanvasRenderingContext2D ||
        context instanceof OffscreenCanvasRenderingContext2D
      )
    ) {
      reject(new Error("🔥 キャンバスがサポートされていません"));

      return;
    }

    const image = new Image();

    const url = URL.createObjectURL(file);

    image.onerror = () => {
      URL.revokeObjectURL(url);

      reject(new Error("🔥 ファイルの読み込みに失敗しました"));
    };

    image.src = url;

    image.onload = () => {
      URL.revokeObjectURL(url);

      const original = {
        width: image.width,
        height: image.height,
      };

      const ratio = original.width / original.height;
      let size = { width, height };

      if (original.width <= width && original.height <= height) {
        size = original;
      } else if (ratio > 1) {
        size.height = Math.round(width / ratio);
      } else {
        size.width = Math.round(height * ratio);
      }

      canvas.width = size.width;
      canvas.height = size.height;

      context.drawImage(image, 0, 0, size.width, size.height);

      if (canvas instanceof OffscreenCanvas) {
        canvas
          .convertToBlob({ type: file.type, quality })
          .then(resolve)
          .catch(() => reject(new Error("🔥 サムネイルの作成に失敗しました")));
      } else {
        (canvas as HTMLCanvasElement).toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error("🔥 サムネイルの作成に失敗しました"));
            }
          },
          file.type,
          quality,
        );
      }
    };
  });
};
