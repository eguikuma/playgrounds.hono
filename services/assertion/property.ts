type KeysOfUnion<T> = T extends unknown ? keyof T : never;

export const has = <T, K extends KeysOfUnion<NonNullable<T>>>(
  object: T,
  property: K,
): object is NonNullable<T> & {
  [P in K]-?: NonNullable<NonNullable<T>[P & keyof NonNullable<T>]>;
} => {
  if (object === undefined || object === null) {
    return false;
  }

  const nonNullableObject = object as NonNullable<T>;

  return (
    Object.hasOwn(nonNullableObject, property as string) &&
    nonNullableObject[property as keyof NonNullable<T>] !== undefined &&
    nonNullableObject[property as keyof NonNullable<T>] !== null
  );
};
