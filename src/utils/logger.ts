export class Logger {
  static logRequest(method: string, url: string, data?: unknown) {
    console.log(`\n[HTTP Request] 🚀 ${method} -> ${url}`);
    if (data) {
      console.log(`[Payload]:`, JSON.stringify(data, null, 2));
    }
  }

  static logResponse(status: number, body?: unknown) {
    const emoji = status >= 400 ? "❌" : "✅";
    console.log(`[HTTP Response] ${emoji} Status: ${status}`);
    if (body !== undefined) {
      console.log(`[Body]:`, JSON.stringify(body, null, 2));
    }
    console.log("--------------------------------------------------");
  }
}
