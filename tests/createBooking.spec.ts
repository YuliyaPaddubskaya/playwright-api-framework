import { test, expect } from "../src/fixtures/testFixtures";
import { BookingBuilder } from "../src/api/builders/BookingBuilder";
import { bookingResponseSchema } from "../src/api/schemas/booking.schema";

test.describe("Booking - Create API", () => {
  test("Should create a new booking successfully and validate schema", async ({
    bookingClient,
  }) => {
    // 1. Build test data using the Builder pattern
    const newBookingData = new BookingBuilder()
      .withFirstname("Yuliya")
      .withTotalPrice(450)
      .build();

    // 2. Send the request via the clean API client wrapper
    const response = await bookingClient.createBooking(newBookingData);
    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    // 3. Validate response structure against the Zod schema
    const validationResult = bookingResponseSchema.safeParse(responseBody);
    expect(validationResult.success).toBe(true);

    // 4. Perform business assertions
    expect(responseBody.booking.firstname).toBe("Yuliya");
    expect(responseBody.booking.totalprice).toBe(450);
  });
});
