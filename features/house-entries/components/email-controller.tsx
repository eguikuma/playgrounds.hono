"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  type ChangeEvent,
  type ChangeEventHandler,
  memo,
  useCallback,
  useMemo,
} from "react";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/elements/text-field";
import { AsyncButton } from "@/components/elements/trigger";
import { EnterFamilyBody } from "@/routes/endpoints/families/enter/schema";
import { cn } from "@/styles/functions";
import repositories from "../repositories";

export const EmailController = memo(() => {
  const router = useRouter();
  const {
    control,
    formState: { isSubmitting, errors },
    handleSubmit,
    setError,
    clearErrors,
  } = useForm<EnterFamilyBody>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(EnterFamilyBody),
    mode: "onChange",
  });

  const message = useMemo(
    () =>
      errors.root
        ? errors.root.message
        : errors.email
          ? errors.email.message
          : "",
    [errors.email, errors.root],
  );

  const withClear = useCallback(
    (onChange: ChangeEventHandler<HTMLInputElement>) =>
      (event: ChangeEvent<HTMLInputElement>) => {
        if (errors.root) {
          clearErrors("root");
        }

        onChange(event);
      },
    [clearErrors, errors.root],
  );

  const submit = handleSubmit(async (data) => {
    try {
      await repositories.families.enter(data);

      router.replace("/");
    } catch (e: any) {
      setError("root", { message: e.message || "おうちに入れませんでした" });

      throw e;
    }
  });

  return (
    <Controller
      control={control}
      name="email"
      render={({ field: { value, onChange }, formState: { isValid } }) => (
        <div
          className={cn(
            "flex flex-col gap-4 md:gap-6",
            isSubmitting && "pointer-events-none",
          )}
        >
          <Input
            label="メールアドレス"
            type="email"
            placeholder="hono@example.com"
            value={value}
            onChange={withClear(onChange)}
            {...(message
              ? {
                  error: message,
                }
              : isValid
                ? { success: "おうちに入る準備ができました" }
                : {
                    helperText:
                      "メールアドレスを入力して、おうちに入りましょう",
                  })}
            required
            fullWidth
          />
          <AsyncButton
            onClick={submit}
            disabled={!!message || !isValid || isSubmitting}
            fullWidth
          >
            おうちに入る
          </AsyncButton>
        </div>
      )}
    />
  );
});

EmailController.displayName = "EmailController";
