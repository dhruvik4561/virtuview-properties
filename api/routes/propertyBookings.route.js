import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { getPropertyBookings, updateBookingStatus } from '../controllers/propertyBookings.controller.js';

const router = express.Router();

// Get all bookings for properties owned by the current user
router.get('/', verifyToken, getPropertyBookings);

// Update booking status
router.patch('/:bookingId/status', verifyToken, updateBookingStatus);

export default router; 