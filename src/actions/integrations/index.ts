"use server";

import { redirect } from "next/navigation";
import { onCurrentUser, onUserInfo } from "../user";
import {
  createIntegration,
  deleteIntegration,
  getIntegration,
} from "./queries";
import { generateTokens } from "@/lib/fetch";
import axios from "axios";
import { createNotification } from "../notifications";
import { capitalize } from "@/lib/utils";

export const onOAuthInstagram = (strategy: "INSTAGRAM" | "CRM") => {
  if (strategy === "INSTAGRAM") {
    return redirect(process.env.INSTAGRAM_EMBEDDED_OAUTH_URL as string);
  }
};

export const onIntegrate = async (code: string) => {
  const user = await onCurrentUser();
  try {
    const integration = await getIntegration(user.id);

    if (integration && integration.integrations.length === 0) {
      const token = await generateTokens(code);
      console.log(token);

      if (token) {
        const insta_id = await axios.get(
          `${process.env.INSTAGRAM_BASE_URL}/me?fields=user_id&access_token=${token.access_token}`
        );

        const today = new Date();
        const expire_date = today.setDate(today.getDate() + 60);
        const create = await createIntegration(
          user.id,
          token.access_token,
          new Date(expire_date),
          insta_id.data.user_id
        );
        createNotification(
          "you have integrated to your Instagram account",
          create.id
        );
        return { status: 200, data: create };
      }
      console.log("🔴 401");
      return { status: 401 };
    }
    console.log("🔴 404");
    return { status: 404 };
  } catch (error) {
    console.log("🔴 500", error);
    return { status: 500 };
  }
};

export const disconnectIntegrate = async (integrationId: string) => {
  const user = await onUserInfo();
  try {
    const integration = await deleteIntegration(integrationId, user.data!.id);
    if (integration && integration.userId) {
      const integrationName = capitalize(integration.name);
      createNotification(
        `you have unintegrated your ${integrationName} account`,
        integration.userId
      );
      return { status: 200, data: "unintegrated successfully" };
    }
    console.log("🔴 404");

    return { status: 404 };
  } catch (error) {
    console.log("🔴 500", error);
    return { status: 500 };
  }
};
