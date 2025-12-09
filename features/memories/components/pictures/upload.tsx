"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Images, X } from "lucide-react";
import Image from "next/image";
import { type MouseEvent, memo, useCallback, useEffect, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { useFieldArray, useForm } from "react-hook-form";
import { AsyncButton, Mark } from "@/components/elements/trigger";
import { Description, Title } from "@/components/elements/typography";
import { Footer } from "@/components/structures";
import { useNoPullToRefresh } from "@/hooks";
import { toThumbnail } from "@/services/converter/file";
import { uuid } from "@/services/uuid";
import { cn } from "@/styles/functions";
import { UploadPicturesFields } from "../../models/picture";
import repositories from "../../repositories";

type UploadProps = {
  albumId: string | null;
  onClose: () => void;
  onSuccess: () => void;
};

export const Upload = memo<UploadProps>(
  ({ albumId = null, onClose, onSuccess }) => {
    useNoPullToRefresh();

    const {
      control,
      formState: { isSubmitting, errors },
      handleSubmit,
      setError,
    } = useForm<UploadPicturesFields>({
      defaultValues: {
        albumId,
        files: [],
      },
      resolver: zodResolver(UploadPicturesFields),
      mode: "onChange",
    });

    const { fields, append, remove } = useFieldArray({
      control,
      name: "files",
    });

    const message = useMemo(
      () =>
        errors.root
          ? errors.root.message
          : errors.files
            ? errors.files.message
            : "",
      [errors.files, errors.root],
    );

    const drop = useCallback(
      (acceptedFiles: File[]) => {
        for (const file of acceptedFiles.filter((file) =>
          file.type.startsWith("image/"),
        )) {
          append({
            id: uuid(),
            value: file,
            preview: URL.createObjectURL(file),
          });
        }
      },
      [append],
    );

    const dropzone = useDropzone({
      onDrop: drop,
      accept: {
        "image/*": [],
      },
    });

    const cancel = useCallback(
      (e: MouseEvent<HTMLButtonElement>, selected: number) => {
        e.stopPropagation();

        if (fields[selected].preview) {
          URL.revokeObjectURL(fields[selected].preview);
        }

        remove(selected);
      },
      [fields, remove],
    );

    const submit = handleSubmit(async (data) => {
      try {
        const originals: File[] = [];
        const thumbnails: File[] = [];

        for (const file of data.files) {
          try {
            originals.push(file.value);

            const thumbnail = new File(
              [await toThumbnail(file.value)],
              file.value.name,
              { type: file.value.type },
            );

            thumbnails.push(thumbnail);
          } catch (e) {
            console.error("⚠️ サムネイルの作成に失敗しました", e);

            if (originals.length !== thumbnails.length) {
              originals.pop();
            }
          }
        }

        await repositories.pictures.upload({
          albumId: data.albumId,
          originals,
          thumbnails,
        });

        onSuccess?.();
      } catch (e: any) {
        setError("root", {
          message: e.message || "写真のアップロードに失敗しました",
        });

        throw e;
      }
    });

    useEffect(() => {
      return () => {
        fields.forEach((field) => {
          URL.revokeObjectURL(field.preview);
        });
      };
    }, [fields]);

    return (
      <div
        className={cn(
          "flex flex-col gap-4 pb-[86px] md:gap-6 md:pb-4 lg:gap-8",
          isSubmitting && "pointer-events-none",
        )}
      >
        <div className="flex flex-col gap-4">
          <Title as="h1">写真をアップロード</Title>

          <Description>
            <p>写真をアップロードして家族と思い出を共有しましょう。</p>
          </Description>
        </div>

        <div className="flex flex-col gap-4 md:gap-6">
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 md:gap-6">
            <div
              {...dropzone.getRootProps()}
              className={cn(
                "flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-outline border-dashed p-6",
                dropzone.isDragActive && "border-brand bg-brand/10",
              )}
            >
              <input {...dropzone.getInputProps()} />
              <div className="flex flex-col items-center justify-center gap-2">
                <Images className="h-12 w-12 text-secondary" />
                <p className="text-center text-lg text-secondary">写真を追加</p>
                <p>※ 一度に20枚までアップロード可能</p>
              </div>
            </div>

            {fields.length > 0 && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm">
                  <p>選択された写真（{fields.length}枚）</p>
                  {message && <p className="text-error">{message}</p>}
                </div>
                <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {fields.map((field, index) => (
                    <li
                      key={field.id}
                      className="relative aspect-square rounded-md bg-outline/10"
                    >
                      <div className="relative h-full w-full overflow-hidden rounded-md">
                        <Image
                          src={field.preview}
                          alt={field.value.name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <Mark
                            value={X}
                            size="small"
                            kind="secondary"
                            filled
                            onClick={(e) => cancel(e, index)}
                            aria-label="削除"
                          />
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <AsyncButton
            onClick={submit}
            onSuccess={onClose}
            disabled={fields.length === 0 || !!message || isSubmitting}
            fullWidth
          >
            アップロードする
          </AsyncButton>
        </div>

        <Footer to={onClose} fixed />
      </div>
    );
  },
);

Upload.displayName = "Upload";
