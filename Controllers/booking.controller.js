// controllers/booking.controller.js
import { rooms } from './room.controller.js';

export const bookRoom = (req, res) => {
    const { CustomerName, date, startTime, endTime, roomId } = req.body;

    // Validate request body
    if (!CustomerName || !date || !startTime || !endTime || !roomId) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const room = rooms.find(room => room.id === parseInt(roomId));

    if (!room) {
        return res.status(404).json({ message: "Room not found" });
    }

    // Check if the room is available for the given date and time
    const isAvailable = room.bookings.every(booking => {
        if (booking.date === date) {
            const bookingStartTime = new Date(`${booking.date}T${booking.startTime}:00`);
            const bookingEndTime = new Date(`${booking.date}T${booking.endTime}:00`);
            const newStartTime = new Date(`${date}T${startTime}:00`);
            const newEndTime = new Date(`${date}T${endTime}:00`);

            return newEndTime <= bookingStartTime || newStartTime >= bookingEndTime;
        }
        return true;
    });

    if (!isAvailable) {
        return res.status(400).json({ message: "Room is not available for the given date and time" });
    }

    // Add the new booking
    const newBooking = {
        id: room.bookings.length + 1,
        CustomerName,
        date,
        startTime,
        endTime,
        bookingDate: new Date()
    };
    room.bookings.push(newBooking);

    res.status(200).json({ message: "Room booked successfully", booking: newBooking });
};

export const listBookings = (req, res) => {
    const bookings = rooms.flatMap(room => room.bookings.map(booking => ({
        roomName: room.name,
        bookedStatus: true,
        ...booking
    })));
    res.json(bookings);
};
export const listCustomers = (req, res) => {
    const customers = rooms.flatMap(room => room.bookings.map(booking => ({
        customerName: booking.CustomerName,
        roomName: room.name,
        ...booking
    })));
    res.json(customers);
}; 
export const customerBookingCount = (req, res) => {
    const { customerName } = req.params;

    const bookings = rooms.flatMap(room => room.bookings
        .filter(booking => booking.CustomerName.toLowerCase() === customerName.toLowerCase())
        .map((booking, index) => ({
            roomName: room.name,
            bookingId: index + 1,
            bookingDate: new Date(),
            ...booking
        }))
    );

    res.json(bookings);
};