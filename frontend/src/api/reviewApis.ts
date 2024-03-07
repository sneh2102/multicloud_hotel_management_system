import { postRequest } from "./axios";
import { getRequest } from "./axios";

 interface reviewPayload {
    userId: number,
    roomId: string,
    review: string,
}

interface review {
    UserId: string,
    RoomId: string,
    Review: string,
    Sentiment: number,
    Polarity: string,
    Date: string,
    ReviewId: string,
}

const API_URL = "https://gu1twri79c.execute-api.us-east-1.amazonaws.com/dev"

export const postReview = (payload: reviewPayload) => {
  console.log("payload", payload);
  return postRequest(
    API_URL + "/review",
    payload
  );
};

export const getReview = (roomId: number) => {
  console.log("id", roomId);
  return getRequest<review>(
    API_URL +`/review/${roomId}`
  );
};
