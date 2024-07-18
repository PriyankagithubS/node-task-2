// routes/roomRoutes.js
import express from 'express';
import { createRoom, listRooms } from '../Controllers/room.controller.js';

const router = express.Router();

router.post('/addRoom', createRoom);
router.get('/getRooms', listRooms);

export default router;
