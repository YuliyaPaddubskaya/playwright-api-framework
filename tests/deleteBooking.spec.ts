import { test, expect } from "../src/fixtures/testFixtures";
import { BookingBuilder } from "../src/api/builders/BookingBuilder";

test.describe("Booking - Delete API", () => {
  test("Should delete booking with shared token and verify it is not found", async ({
    bookingClient,
    authToken,
  }) => {
    // 1. Create a booking to delete
    const bookingData = new BookingBuilder().build();
    const createResponse = await bookingClient.createBooking(bookingData);
    const bookingId = (await createResponse.json()).bookingid;

    // 2. Delete the booking using the shared token (Restful-booker returns 201 on success)
    const deleteResponse = await bookingClient.deleteBooking(
      bookingId,
      authToken,
    );
    expect(deleteResponse.status()).toBe(201);

    // 3. Verify that the booking no longer exists (expect 404 Not Found)
    const getResponse = await bookingClient.getBookingById(bookingId);
    expect(getResponse.status()).toBe(404);
  });
});
