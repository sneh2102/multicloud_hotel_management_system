export default interface Feedback {
  id: string;
  bookingId: string;
  sentiment: string;
  score: number;
  feedback: string;
  magnitude: number;
  room: string;
}
