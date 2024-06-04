import { getRooms } from "../../api/roomManagementApis";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getUser } from "../../api/authApis";
import { Auth, useAuth } from "../../context/Auth";
type Room = {
  room: string;
  Address: string;
  Amenities: string[];
  Availability: string;
  Beds: number;
  Price: string;
  Agent: string;
};
const RoomManagment = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const { getSession } = useAuth();
  const [customerId, setCustomerId] = useState<number | undefined>(undefined);
  var agentid = "";
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const session = await getSession();
        const email = session.getIdToken().payload.email;

        const data = await getUser(email);
        setCustomerId(data.data.userId);
        agentid = data.data.userId.toString();
      } catch (err) {
        console.error("Error fetching user details:", err);
      }
    };

    // Fetch the rooms data from the API
    const fetchRooms = async () => {
      try {
        const response = await fetch(
          "https://v0mqolz1ub.execute-api.us-east-1.amazonaws.com/dev/rooms/get",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              agent: agentid,
            }),
          }
        );

        const data = await response.json();

        if (data.rooms) {
          setRooms(data.rooms);
        } else {
          setRooms([]);
          console.error("Rooms data is not available:", data);
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
        setRooms([]); // Ensure rooms is always an array
      }
    };
    fetchUserDetails().then(() => fetchRooms());
  }, []);
  const navigate = useNavigate();
  const handleAddRoom = () => {
    navigate("/room-managment/add");
  };
  const handleDelete = async (room: string) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this room?"
      );
      if (!confirmed) {
        return;
      }

      const response = await fetch(
        "https://v0mqolz1ub.execute-api.us-east-1.amazonaws.com/dev/rooms/delete",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            agent: agentid,
            room: room,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        // Delete the room from the local state
        setRooms((prevRooms) => prevRooms.filter((r) => r.room !== room));
        window.location.reload();
      } else {
        console.error("Failed to delete room:", data);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting room:", error);
      window.location.reload();
    }
  };

  const handleEdit = (room: Room) => {
    navigate("/room-managment/update", { state: { room } });
  };

  return (
    <div>
      <h1>Rooms List</h1>
      <table className="table table-striped container">
        <thead>
          <tr>
            <th>Room</th>
            <th>Address</th>
            <th>Amenities</th>
            <th>Availability</th>
            <th>Beds</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rooms.length > 0 ? (
            rooms.map((room, index) => (
              <tr key={index}>
                <td>{room.room}</td>
                <td>{room.Address}</td>
                <td>{room.Amenities}</td>
                <td>{room.Availability}</td>
                <td>{room.Beds}</td>
                <td>{room.Price}</td>
                <td>
                  <button
                    className="btn btn-warning mx-1"
                    onClick={() => handleEdit(room)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger mx-1"
                    onClick={() => handleDelete(room.room)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>No rooms available</td>
            </tr>
          )}
        </tbody>
      </table>
      <div></div>
      <button className="btn btn-primary" onClick={handleAddRoom}>
        Add Room
      </button>
    </div>
  );
};

export default RoomManagment;
