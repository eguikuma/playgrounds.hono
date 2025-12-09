import { StatusCodes } from "http-status-codes";
import { AccessMethod, AttemptKind } from "@/models";
import { validator } from "@/routes/middlewares";
import { factory } from "../../../helpers";
import { EnterFamilyBody } from "./schema";

export const enter = factory.createHandlers(
  validator.json(EnterFamilyBody),
  async (context) => {
    try {
      const body = context.req.valid("json");

      if (!(await context.var.keeper.attempts.verify(context.var.ip))) {
        return context.json(
          { message: "ちょっと休憩してからもう一度お試しください" },
          StatusCodes.TOO_MANY_REQUESTS,
        );
      }

      if (!(await context.var.keeper.whitelists.email(body.email))) {
        await context.var.keeper.attempts.add(
          context.var.ip,
          AttemptKind.FailedEmail,
        );

        return context.json(
          { message: "このメールアドレスは見覚えがないようです" },
          StatusCodes.UNAUTHORIZED,
        );
      }

      const session = await context.var.keeper.sessions.create(
        context.var.ip,
        AccessMethod.Email,
      );

      if (!session) {
        return context.json(
          { message: "今はおうちに入ることができないようです" },
          StatusCodes.INTERNAL_SERVER_ERROR,
        );
      }

      return context.json({ data: "おうちずかんへようこそ！" }, StatusCodes.OK);
    } catch (e) {
      console.error("🔥 入室に失敗しました", e);

      return context.json(
        { message: "入室に失敗しました" },
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  },
);
