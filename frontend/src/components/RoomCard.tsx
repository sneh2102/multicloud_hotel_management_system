import React from "react";
import image from "../images/room.jpg";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import Room from "../interfaces/Room";

interface RoomCardProps {
  room: Room;
  onClick: () => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, onClick }) => {
  return (
    <Card onClick={onClick} style={{ cursor: "pointer" }}>
      <CardMedia component="img" height="140" image={image} alt={room.room} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {room.room}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {room.Price}
        </Typography>
        <Button variant="contained" color="primary">
          Book Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default RoomCard;
