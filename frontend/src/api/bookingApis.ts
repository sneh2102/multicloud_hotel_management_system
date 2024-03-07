import Booking from "../interfaces/Booking";
import { postRequest } from "./axios";

export const getBookingsByUser = async (email: string): Promise<Booking[]> => {
  const response = await postRequest<{ bookings: Booking[] }>(
    `https://p2r4cn9vyj.execute-api.us-east-1.amazonaws.com/dev/booking`,
    { email: email }
  );
  return response.data.bookings;
};

export const storeFeedback = (
  room: string,
  feedback: string,
  customerId: number | undefined,
  bookingId: string
) => {
  return postRequest<any>(
    "https://r9haxo9w40.execute-api.us-east-1.amazonaws.com/dev/booking/store-feedback",
    {
      customerId: customerId,
      bookingId: bookingId,
      feedback: feedback,
      room: room,
    }
  );
};
