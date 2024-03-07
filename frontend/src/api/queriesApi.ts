import { getRequest, postRequest } from "./axios";

/**
 * Author: Ketul Patel
 * Model class for query response
 */
export interface Query {
  id: string;
  description: string;
  date: string;
  agentId: number;
  customerId: number;
  bookingId: string;
}

/**
 * Author: Ketul Patel
 * Model class for Message response
 */
export interface Message {
  id?: string;
  message: string;
  date?: string;
  agentId?: number;
  customerId?: number;
  bookingId?: string;
  owner?: number;
}

/**
 * Author: Ketul Patel
 * Backend endpoint of serverless application
 */
const QUERIES_ENDPOINT =
  "https://yzoxyckcb4.execute-api.us-east-1.amazonaws.com/";

/**
 * Author: Ketul Patel
 * This method retrieves queries related to agent
 * @param agentId agentId for whom queries needs to be fetched
 * @returns
 */
export const getAgentQueries = (agentId: number) => {
  return getRequest<Array<Query>>(
    QUERIES_ENDPOINT + "agent-queries/" + agentId
  );
};

/**
 * Author: Ketul Patel
 * This method retrieves queries related to customer
 * @param agentId customerId for whom queries needs to be fetched
 * @returns
 */
export const getCustomerQueries = (customerId: number) => {
  return getRequest<Array<Query>>(
    QUERIES_ENDPOINT + "customer-queries/" + customerId
  );
};

/**
 * Author: Ketul Patel
 * This method insert message to Google pub/sub queue is cloud functions
 * @param message message to insert in Pub/Sub queue
 * @returns
 */
export const postMessage = (
  message: string,
  userId: number | undefined,
  userEmail?: string
) => {
  return postRequest<any>(
    "https://us-central1-serverless-426912.cloudfunctions.net/post-customer-query",
    {
      customerId: userId,
      customerEmail: userEmail,
      bookingId: "123",
      message: message,
    }
  );
};

/**
 * Author: Ketul Patel
 * Fetch all messages between customerId and agentId
 * @param customerId
 * @param agentId
 * @returns
 */
export const getMessages = (
  customerId: string,
  agentId: string,
  bookingId: string
) => {
  return getRequest<Array<Message>>(
    QUERIES_ENDPOINT +
      "messages/" +
      customerId +
      "/" +
      agentId +
      "/" +
      bookingId
  );
};

/**
 * Author: Ketul Patel
 * This method enters message into DynamoDB.
 * @param message Message to inserted into Dynamo DB
 * @returns
 */
export const createMessage = (message: Message) => {
  return postRequest<any>(QUERIES_ENDPOINT + "create-message", message);
};
