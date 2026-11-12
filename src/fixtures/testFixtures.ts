import { test as base } from "@playwright/test";
import { ApiClientWrapper } from "../api/clients/ApiClientWrapper";
import { AuthClient } from "../api/clients/auth/AuthClient";
import { BookingClient } from "../api/clients/BookingClient";

type MyFixtures = {
  authClient: AuthClient;
  bookingClient: BookingClient;
  authToken: string;
};

export const test = base.extend<MyFixtures>({
  authClient: async ({ request }, use) => {
    const apiWrapper = new ApiClientWrapper(request);
    await use(new AuthClient(apiWrapper));
  },

  bookingClient: async ({ request }, use) => {
    const apiWrapper = new ApiClientWrapper(request);
    await use(new BookingClient(apiWrapper));
  },

  authToken: async ({}, use) => {
    const token = process.env.AUTH_TOKEN;
    if (!token) {
      throw new Error("AUTH_TOKEN is missing in environment variables!");
    }
    await use(token);
  },
});

export { expect } from "@playwright/test";
