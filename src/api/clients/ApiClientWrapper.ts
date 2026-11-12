import { APIRequestContext, APIResponse } from "@playwright/test";
import { Logger } from "../../utils/logger";

export class ApiClientWrapper {
  constructor(private readonly request: APIRequestContext) {}

  async get(
    url: string,
    headers?: Record<string, string>,
  ): Promise<APIResponse> {
    Logger.logRequest("GET", url);
    const response = await this.request.get(url, { headers });
    const body = await this.parseBody(response);
    Logger.logResponse(response.status(), body);
    return response;
  }

  async post<T>(
    url: string,
    data?: T,
    headers?: Record<string, string>,
  ): Promise<APIResponse> {
    Logger.logRequest("POST", url, data);
    const response = await this.request.post(url, { data, headers });
    const body = await this.parseBody(response);
    Logger.logResponse(response.status(), body);
    return response;
  }

  async put<T>(
    url: string,
    data?: T,
    headers?: Record<string, string>,
  ): Promise<APIResponse> {
    Logger.logRequest("PUT", url, data);
    const response = await this.request.put(url, { data, headers });
    const body = await this.parseBody(response);
    Logger.logResponse(response.status(), body);
    return response;
  }

  async delete(
    url: string,
    headers?: Record<string, string>,
  ): Promise<APIResponse> {
    Logger.logRequest("DELETE", url);
    const response = await this.request.delete(url, { headers });
    const body = await this.parseBody(response);
    Logger.logResponse(response.status(), body);
    return response;
  }

  private async parseBody(response: APIResponse): Promise<unknown> {
    try {
      return await response.json();
    } catch {
      return undefined; // If the response body is empty or not valid JSON
    }
  }
}
