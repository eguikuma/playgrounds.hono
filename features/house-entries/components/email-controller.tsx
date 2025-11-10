"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { memo } from "react";
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
  } = useForm<EnterFamilyBody>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(EnterFamilyBody),
  });

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
            onChange={onChange}
            {...(errors.root
              ? { error: errors.root.message }
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
            disabled={!isValid || isSubmitting}
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
