import { useEffect, useState } from "react";
import Room from "../interfaces/Room";
import RoomCard from "../components/RoomCard";
import { Grid, Dialog } from "@mui/material";
import { getRooms } from "../api/roomManagementApis";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getRoomList = async () => {
      const res = await getRooms();
      if (Array.isArray(res)) {
        setRooms(res);
        console.log(rooms);
      } else {
        setRooms([]);
      }
    };
    getRoomList();
  }, []);

  const handleCardClick = (room: string) => {
    navigate(`/room/${room}`);
  };

  return (
    <Grid container spacing={2}>
      {rooms.map((Room) => (
        <Grid item xs={12} sm={6} md={4} key={Room.room}>
          <RoomCard room={Room} onClick={() => handleCardClick(Room.room)} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Home;
