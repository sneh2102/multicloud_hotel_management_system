import React, { useEffect, useState } from "react";
import { Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { getBookingsByUser, storeFeedback } from "../../api/bookingApis";
import Booking from "../../interfaces/Booking";
import { useAuth } from "../../context/Auth";
import { getUser } from "../../api/authApis";
import { toast } from "react-toastify";

const BookingHistory: React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [feedback, setFeedback] = useState<string>('');
    const { getSession } = useAuth();
    const [customerId, setCustomerId] = useState<number | undefined>(undefined);

    const fetchBookings = async () => {
        try {
            const session = await getSession();
            const email = session.getIdToken().payload.email;
            // console.log("email : ", email);
            // const data = await getUser(email);
            // console.log("user : ", data);
            // setCustomerId(data.data.userId);

            // if (!customerId) {
            //     console.error("User ID is undefined");
            //     return;
            // }

            const bookingsData = await getBookingsByUser(email);
            setBookings(bookingsData);
        } catch (err) {
            console.error("Error fetching user or booking details:", err);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleSendFeedback = async (room: string, bookingId: string) => {
        if (!feedback) {
            toast.error("Feedback cannot be empty");
            return;
        }
        try {
            await storeFeedback(room, feedback, customerId, bookingId);
            setFeedback('');
            toast.success("Feedback sent successfully");
        } catch (err) {
            console.log(err);
            toast.error("Feedback not sent");
        }
    };

    return (
        <div className="max-w-2xl mx-auto my-8 p-4">
            <Typography variant="h4" component="div" gutterBottom>
                Booking History
            </Typography>
            {bookings.map((booking) => (
                <Card key={booking.bookingid} className="my-4">
                    <CardContent>
                        <Typography variant="h5" component="div">
                            Room: {booking.room}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Booking Date: {new Date(booking.date).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Booking ID: {booking.bookingid}
                        </Typography>
                        <div className="mt-4">
                            <TextField
                                label="Feedback"
                                multiline
                                rows={4}
                                variant="outlined"
                                fullWidth
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleSendFeedback(booking.room, booking.bookingid)}
                                className="mt-2"
                            >
                                Send
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default BookingHistory;
