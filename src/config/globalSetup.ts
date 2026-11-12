import dotenv from "dotenv";
dotenv.config();

import { FullConfig, request } from "@playwright/test";

async function globalSetup(config: FullConfig) {
  const baseURL = process.env.API_BASE_URL;

  if (!baseURL) {
    throw new Error("Global Setup: API_BASE_URL is not defined in .env file!");
  }

  const apiContext = await request.newContext({
    baseURL: baseURL,
  });

  const response = await apiContext.post("/auth", {
    data: {
      username: process.env.ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD,
    },
  });

  if (!response.ok()) {
    const errorText = await response.text();
    throw new Error(
      `Global Setup failed to get auth token: ${response.status()} ${response.statusText()} - ${errorText}`,
    );
  }

  const body = await response.json();
  const token = body.token;

  if (!token) {
    throw new Error("Global Setup: Token was not returned in response body!");
  }

  process.env.AUTH_TOKEN = token;

  await apiContext.dispose();
  console.log("✅ Global Setup: Auth token successfully acquired and shared.");
}

export default globalSetup;
