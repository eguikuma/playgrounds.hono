import { Description, Title } from "@/components/elements/typography";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-4">
      <Title as="h1">うーん...</Title>
      <Description>
        <p>探しているものはどこか別の場所にあるようです。</p>
      </Description>
    </div>
  );
}
