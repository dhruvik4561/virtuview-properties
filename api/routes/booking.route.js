import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { createBooking, getBookings, updateBookingStatus } from '../controllers/booking.controller.js';

const router = express.Router();

// Create a new booking
router.post('/', verifyToken, createBooking);

// Get all bookings for the current user
router.get('/', verifyToken, getBookings);

// Update booking status (for property owners)
router.patch('/:bookingId/status', verifyToken, updateBookingStatus);

export default router; 