import { PrismaClient } from '@prisma/client';
import { createError } from '../lib/createError.js';

const prisma = new PrismaClient();

export const createBooking = async (req, res, next) => {
  try {
    const { postId, date } = req.body;
    const userId = req.userId;

    if (!postId || !date) {
      return next(createError(400, 'Post ID and date are required'));
    }

    // Check if the post exists
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return next(createError(404, 'Post not found'));
    }

    // Check if the date is in the future
    const bookingDate = new Date(date);
    const currentDate = new Date();
    
    if (bookingDate <= currentDate) {
      return next(createError(400, 'Booking date must be in the future'));
    }

    // Check if the user has already booked this post for the same date
    const existingBooking = await prisma.booking.findFirst({
      where: {
        userId,
        postId,
        date: bookingDate,
      },
    });

    if (existingBooking) {
      return next(createError(400, 'You have already booked this property for this date'));
    }

    // Create the booking
    const booking = await prisma.booking.create({
      data: {
        userId,
        postId,
        date: bookingDate,
      },
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
        post: {
          select: {
            title: true,
            price: true,
            address: true,
          },
        },
      },
    });

    res.status(201).json(booking);
  } catch (err) {
    next(err);
  }
};

export const getBookings = async (req, res, next) => {
  try {
    const userId = req.userId;

    const bookings = await prisma.booking.findMany({
      where: {
        userId,
      },
      include: {
        post: {
          select: {
            title: true,
            price: true,
            address: true,
            images: true,
          },
        },
      },
      orderBy: {
        date: 'asc',
      },
    });

    res.status(200).json(bookings);
  } catch (err) {
    next(err);
  }
};

export const updateBookingStatus = async (req, res, next) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;
    const userId = req.userId;

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return next(createError(400, 'Invalid status'));
    }

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        post: {
          select: {
            userId: true,
          },
        },
      },
    });

    if (!booking) {
      return next(createError(404, 'Booking not found'));
    }

    // Only the post owner can update the booking status
    if (booking.post.userId !== userId) {
      return next(createError(403, 'You are not authorized to update this booking'));
    }

    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: { status },
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
        post: {
          select: {
            title: true,
            price: true,
            address: true,
          },
        },
      },
    });

    res.status(200).json(updatedBooking);
  } catch (err) {
    next(err);
  }
}; 