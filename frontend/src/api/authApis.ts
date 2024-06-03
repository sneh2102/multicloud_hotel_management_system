import { postRequest } from "./axios";
import { getRequest } from "./axios";

export interface Que {
  quesId: number;
  que: string;
}

export interface checkAnswerPayload {
  email: string;
  queId: number;
  answer: string;
  cipher_text: string;
  decrypted_text: string;
}

export interface Que {
  body: Array<Que>;
  quesId: number;
  que: string;
}

export interface User {
  email: string;
  name: string;
  role: string;
  createdAt: string;
  queId: Array<number>;
  userId: number;
}

export interface Answers {
  email: string;
  queAns: Array<{ queId: number; answer: string }>;
}
export interface AnswersPayload {
  email: string;
  queAns: Array<{ queId: number | undefined; answer: string }>;
  key: number | undefined;
}

export interface postUserType {
  email: string;
  queAns: Array<[string]>;
  name: string;
  role: string;
}
export interface userPayload {
  email: string;
  queId: Array<number | undefined>;
  name: string;
  role: string;
}

const API_URL = "https://gu1twri79c.execute-api.us-east-1.amazonaws.com/dev"

export const checkAnswer = (payload: checkAnswerPayload) => {
  console.log("payload", payload);
  return postRequest(
    API_URL + "/auth/login/secque",
    payload
  );
};

export const getOneQuestion = (id: number) => {
  console.log("id", id);
  return getRequest<Que>(
    API_URL +`/auth/login/secque?id=${id}`
  );
};

export const getQuestions = () => {
  return getRequest<Que>(
    API_URL + "/auth/signup/secque"  );
};

export const getUser = (email: string) => {
  console.log("email", email);
  return getRequest<User>(
    API_URL + `/auth/login?email=${email}`
  );
};

export const postAnswers = (payload: AnswersPayload) => {
  console.log("payload", payload);
  return postRequest<Answers>(
    API_URL + "/auth/signup/secque",
    payload
  );
};

export const postUser = (payload: userPayload) => {
  console.log("payload", payload);
  return postRequest<postUserType>(
    API_URL + "/auth/signup",    payload
  );
};
