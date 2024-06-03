import axios from "axios";

/**
 * Author: Ketul Patel
 * This method makes a get request using axios.
 * @param endpoint endpoint to be called
 * @returns
 */
export const getRequest = <T>(endpoint: string) => {
  return axios.get<T>(endpoint);
};

/**
 * Author: Ketul Patel
 * This method makes a post request using axios.
 * @param endpoint endpoint to be called
 * @returns
 */
export const postRequest = <T>(endpoint: string, body: any) => {
  return axios.post<T>(endpoint, body);
};
