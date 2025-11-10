export const sleep = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms)) as Promise<NodeJS.Timeout>;
