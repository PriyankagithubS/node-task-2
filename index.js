import express from 'express';
import cors from 'cors';
import roomRouter from './Routers/room.router.js';
import bookingRouter from './Routers/booking.router.js'
const app = express();
const PORT=5000;
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.status(200).json({
        message:"Welcome to the Room management system"
    })
    })
app.use('/rooms',roomRouter);
app.use('/bookings',bookingRouter)


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})