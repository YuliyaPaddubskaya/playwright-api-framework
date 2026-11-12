import { test, expect } from "../src/fixtures/testFixtures";
import { BookingBuilder } from "../src/api/builders/BookingBuilder";
import { bookingPayloadSchema } from "../src/api/schemas/booking.schema";

test.describe("Booking - Read API", () => {
  test("Should get list of all bookings", async ({ bookingClient }) => {
    const response = await bookingClient.getBookingIds();
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
  });

  test("Should get booking by ID and validate schema", async ({
    bookingClient,
  }) => {
    // 1. Create a booking first to ensure we have a valid ID.
    const newBookingData = new BookingBuilder().build();
    const createResponse = await bookingClient.createBooking(newBookingData);
    const createBody = await createResponse.json();
    const bookingId = createBody.bookingid;

    // 2. Retrieve the created booking by ID.
    const getResponse = await bookingClient.getBookingById(bookingId);
    expect(getResponse.status()).toBe(200);

    const getBody = await getResponse.json();

    // Validate the payload structure against the Zod schema.
    const validationResult = bookingPayloadSchema.safeParse(getBody);
    expect(validationResult.success).toBe(true);
    expect(getBody.firstname).toBe(newBookingData.firstname);
  });
});
