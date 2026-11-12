import { faker } from '@faker-js/faker';
import { BookingPayload } from '../models/booking.model';

export class BookingBuilder {
  private booking: BookingPayload = {
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    totalprice: faker.number.int({ min: 50, max: 1000 }),
    depositpaid: true,
    bookingdates: {
      checkin: '2026-06-01',
      checkout: '2026-06-10',
    },
    additionalneeds: 'Breakfast',
  };

  withFirstname(firstname: string): this {
    this.booking.firstname = firstname;
    return this;
  }

  withTotalPrice(totalprice: number): this {
    this.booking.totalprice = totalprice;
    return this;
  }

  withoutAdditionalNeeds(): this {
    delete this.booking.additionalneeds;
    return this;
  }

  build(): BookingPayload {
    return this.booking;
  }
}
