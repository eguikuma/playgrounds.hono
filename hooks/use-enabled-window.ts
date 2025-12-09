"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

const getSnapshot = () => true;

const getServerSnapshot = () => false;

export const useEnabledWindow = () =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
