import { PrismaClient } from '@prisma/client';
import { createError } from '../lib/createError.js';

const prisma = new PrismaClient();

export const getPropertyBookings = async (req, res, next) => {
  try {
    const userId = req.userId;

    // Get all posts owned by the user
    const userPosts = await prisma.post.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
      },
    });

    const postIds = userPosts.map(post => post.id);

    // Get all bookings for these posts
    const bookings = await prisma.booking.findMany({
      where: {
        postId: {
          in: postIds,
        },
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
            email: true,
          },
        },
        post: {
          select: {
            title: true,
            address: true,
            price: true,
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

    // Check if the booking exists and belongs to a post owned by the user
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
            email: true,
          },
        },
        post: {
          select: {
            title: true,
            address: true,
            price: true,
          },
        },
      },
    });

    res.status(200).json(updatedBooking);
  } catch (err) {
    next(err);
  }
}; 