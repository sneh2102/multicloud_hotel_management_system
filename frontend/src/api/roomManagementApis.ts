import Feedback from "../interfaces/Feedback";
import Room from "../interfaces/Room";
import { getRequest, postRequest } from "./axios";

export const getRooms = async (): Promise<Room[]> => {
  const response = await getRequest<{ rooms: Room[] }>(
    `https://v0mqolz1ub.execute-api.us-east-1.amazonaws.com/dev/rooms/allrooms`
  );

  const rooms: Room[] = response.data.rooms.map((room) => ({
    Address: room.Address,
    Availability:
      room.Availability === "Avaliable" ? "Available" : room.Availability,
    Amenities: room.Amenities,
    Price: parseFloat(room.Price.toString()),
    Agent: room.Agent,
    Beds: parseInt(room.Beds.toString(), 10),
    room: room.room,
  }));

  return rooms;
};

export const getRoomById = async (roomId: string): Promise<Room> => {
  const response = await postRequest<Room>(
    "https://p2r4cn9vyj.execute-api.us-east-1.amazonaws.com/dev/room/get_room",
    {
      room: roomId,
    }
  );

  return response.data;
};

export const getFeedbackByRoomId = async (
  roomId: string
): Promise<{ data: Feedback[] }> => {
  const response = await postRequest<{ data: Feedback[] }>(
    "https://r9haxo9w40.execute-api.us-east-1.amazonaws.com/dev/room-management/fetch-feedback",
    {
      room: roomId,
    }
  );
  return response.data;
};
