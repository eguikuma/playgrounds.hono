"use client";

import { Description, Title } from "@/components/elements/typography";
import {
  type ApplicationError,
  NetworkError,
  NotFoundError,
  ServerError,
  UnknownError,
} from "@/errors";

const Constructors = {
  NetworkError,
  NotFoundError,
  ServerError,
  UnknownError,
} as Record<string, new () => ApplicationError>;

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ error: e }: ErrorProps) {
  const error = new (Constructors[e.name] ?? UnknownError)();

  return (
    <div className="flex flex-col gap-4">
      <Title as="h1">{error.title}</Title>

      <Description>
        <p>{error.description}</p>
      </Description>
    </div>
  );
}
