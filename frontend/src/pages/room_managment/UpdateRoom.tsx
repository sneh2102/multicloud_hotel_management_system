import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export const UpdateRoom = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  const [room, setRoom] = useState(state);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRoom((prevRoom: any) => ({
      ...prevRoom,
      room: {
        ...prevRoom.room,
        [name]: value,
      },
    }));
  };

  // console.log("Received values:", room);
  const roomData = Object.entries(room.room);

  const handleUpdateRoom = () => {
    console.log("Updated values:", room.room);

    axios
      .post(
        "https://v0mqolz1ub.execute-api.us-east-1.amazonaws.com/dev/rooms/update",
        roomData.reduce((acc: any, [key, value]) => {
          acc[key.toLowerCase()] = value;
          return acc;
        }, {}),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("API response:", response.data);
        alert("Update is successful");
        navigate("/room-managment");
      })
      .catch((error) => {
        console.error("API error:", error);
        alert("Update failed");
      });
  };
  return (
    <div>
      <h1>Room : {room.room.room}</h1>
      <table className="table table-bordered table-striped container">
        <thead>
          <tr>
            <th scope="col">Room</th>
            <th scope="col">Address</th>
            <th scope="col">Amenities</th>
            <th scope="col">Availability</th>
            <th scope="col">Beds</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                className="form-control text-center"
                type="text"
                name="room"
                value={room.room.room}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                className="form-control text-center"
                type="text"
                name="Address"
                value={room.room.Address}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                className="form-control text-center"
                type="text"
                name="Amenities"
                value={room.room.Amenities}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                className="form-control text-center"
                type="text"
                name="Availability"
                value={room.room.Availability}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                className="form-control text-center"
                type="text"
                name="Beds"
                value={room.room.Beds}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                className="form-control text-center"
                type="text"
                name="Price"
                value={room.room.Price}
                onChange={handleInputChange}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <button className="btn btn-primary" onClick={handleUpdateRoom}>
          Update Room
        </button>
      </div>
    </div>
  );
};

export default UpdateRoom;
