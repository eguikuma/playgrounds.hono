"use client";

import { forwardRef, type MouseEvent, useRef, useState } from "react";

import { sleep } from "@/services/timer";
import { Button, type ButtonProps, ButtonStatus } from "./button";

type AsyncButtonProps = Omit<ButtonProps, "status" | "onClick"> & {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => Promise<void>;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  autoReset?: boolean;
  resetDelayMilliseconds?: number;
  waitMilliseconds?: number;
};

export const AsyncButton = forwardRef<HTMLButtonElement, AsyncButtonProps>(
  (
    {
      onClick,
      onSuccess,
      onError,
      autoReset = true,
      resetDelayMilliseconds = 3000,
      waitMilliseconds = 1500,
      children,
      ...props
    },
    ref,
  ) => {
    const timeout = useRef<NodeJS.Timeout | null>(null);

    const [status, setStatus] = useState<ButtonStatus>(ButtonStatus.Idle);

    const click = async (event: MouseEvent<HTMLButtonElement>) => {
      if (status === ButtonStatus.Loading) return;

      if (timeout.current) {
        clearTimeout(timeout.current);
        timeout.current = null;
      }

      try {
        setStatus(ButtonStatus.Loading);

        await onClick?.(event);

        setStatus(ButtonStatus.Success);

        timeout.current = await sleep(waitMilliseconds);

        onSuccess?.();
      } catch (e) {
        setStatus(ButtonStatus.Error);

        timeout.current = await sleep(waitMilliseconds);

        onError?.(e);
      }

      if (autoReset) {
        timeout.current = await sleep(resetDelayMilliseconds);

        setStatus(ButtonStatus.Idle);

        timeout.current = null;
      }
    };

    return (
      <Button ref={ref} {...props} status={status} onClick={click}>
        {children}
      </Button>
    );
  },
);

AsyncButton.displayName = "AsyncButton";
