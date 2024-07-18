// controllers/room.controller.js
export const rooms = [
    { id: 1, name: "Room A", seats: 25, amenities: ["AC", "WiFi", "Food"], price: 100, bookings: [] },
    { id: 2, name: "Room B", seats: 100, amenities: ["AC", "WiFi", "Food"], price: 500, bookings: [] },
    { id: 3, name: "Room C", seats: 150, amenities: ["AC", "WiFi", "Food", "DJ"], price: 800, bookings: [] },
];

export const createRoom = (req, res) => {
    const { name, seats, amenities, price } = req.body;
    const room = {
        id: rooms.length + 1,
        name,
        seats,
        amenities,
        price,
        bookings: []
    };
    rooms.push(room);
    res.status(201).json({ message: 'Room created successfully', room });
};

export const listRooms = (req, res) => {
    res.json(rooms);
};
