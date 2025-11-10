import type { EnterFamilyBody } from "@/routes/endpoints/families/enter/schema";
import { http } from "@/services/http";

export const enter = async (body: EnterFamilyBody) => {
  const response = await http.families.enter.$post({
    json: body,
  });

  if (!response.ok) {
    throw new Error(
      (await response.json()).message || "おうちに入れませんでした",
    );
  }

  return await response.json();
};
