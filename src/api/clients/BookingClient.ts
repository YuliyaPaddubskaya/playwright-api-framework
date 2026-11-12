import { APIResponse } from "@playwright/test";
import { ApiClientWrapper } from "./ApiClientWrapper";
import { BookingPayload } from "../models/booking.model";

export class BookingClient {
  constructor(private readonly api: ApiClientWrapper) {}

  async getBookingIds(): Promise<APIResponse> {
    return this.api.get("/booking");
  }

  async getBookingById(bookingId: number): Promise<APIResponse> {
    return this.api.get(`/booking/${bookingId}`);
  }

  async createBooking(bookingData: BookingPayload): Promise<APIResponse> {
    return this.api.post("/booking", bookingData);
  }

  async updateBooking(
    bookingId: number,
    bookingData: BookingPayload,
    token: string,
  ): Promise<APIResponse> {
    return this.api.put(`/booking/${bookingId}`, bookingData, {
      Cookie: `token=${token}`,
    });
  }

  async deleteBooking(bookingId: number, token: string): Promise<APIResponse> {
    return this.api.delete(`/booking/${bookingId}`, {
      Cookie: `token=${token}`,
    });
  }
}
