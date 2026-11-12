import { ApiClientWrapper } from "../ApiClientWrapper";

export class AuthClient {
  constructor(private readonly api: ApiClientWrapper) {}

  async getToken(
    username = process.env.ADMIN_USERNAME,
    password = process.env.ADMIN_PASSWORD,
  ): Promise<string> {
    const response = await this.api.post("/auth", { username, password });
    const body = await response.json();
    return body.token;
  }
}
