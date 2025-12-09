import { Description, Title } from "@/components/elements/typography";
import { Centered } from "@/components/structures/content/centered";
import { Container } from "@/components/structures/content/container";
import { PullToRefresh } from "@/components/tools";
import { EmailController } from "../components/email-controller";

export const Enter = () => (
  <PullToRefresh>
    <Centered>
      <Container>
        <div className="flex flex-col gap-4">
          <Title as="h1">おうちずかんへようこそ</Title>
          <Description>
            <p>おうちずかんは、大切な思い出を家族で共有するための場所です。</p>
          </Description>
        </div>

        <EmailController />
      </Container>
    </Centered>
  </PullToRefresh>
);
