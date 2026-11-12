import { test, expect } from "../src/fixtures/testFixtures";
import { BookingBuilder } from "../src/api/builders/BookingBuilder";

test.describe("Booking - Update API", () => {
  test("Should update booking successfully with shared token", async ({
    bookingClient,
    authToken, // Automatically retrieved from Global Setup via fixture
  }) => {
    // 1. Create an initial booking record
    const initialData = new BookingBuilder()
      .withFirstname("InitialName")
      .build();
    const createResponse = await bookingClient.createBooking(initialData);
    const bookingId = (await createResponse.json()).bookingid;

    // 2. Prepare updated payload data
    const updatedData = new BookingBuilder()
      .withFirstname("UpdatedName")
      .withTotalPrice(999)
      .build();

    // 3. Send update request using the shared token
    const updateResponse = await bookingClient.updateBooking(
      bookingId,
      updatedData,
      authToken,
    );
    expect(updateResponse.status()).toBe(200);

    const updatedBody = await updateResponse.json();
    expect(updatedBody.firstname).toBe("UpdatedName");
    expect(updatedBody.totalprice).toBe(999);
  });
});
