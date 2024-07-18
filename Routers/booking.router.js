// routes/bookingRoutes.js
import express from 'express';
import {
    bookRoom, listBookings, listCustomers,
    customerBookingCount } from '../Controllers/booking.controller.js'; 

const router = express.Router();

router.post('/bookRoom', bookRoom);
router.get('/listBookings', listBookings);
router.get('/listCustomers', listCustomers);
router.get('/customerBookingCount/:customerName', customerBookingCount);


export default router;
