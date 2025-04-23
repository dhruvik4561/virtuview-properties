import prisma from "../lib/prisma.js";

export const getStats = async (req, res) => {
  try {
    const [
      totalProperties,
      totalUsers,
      totalBookings,
      pendingBookings
    ] = await Promise.all([
      prisma.post.count(),
      prisma.user.count(),
      prisma.booking.count(),
      prisma.booking.count({
        where: { status: "pending" }
      })
    ]);

    res.status(200).json({
      totalProperties,
      totalUsers,
      totalBookings,
      pendingBookings
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get stats" });
  }
};

export const getBookings = async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        user: {
          select: {
            username: true,
            email: true,
          }
        },
        post: {
          select: {
            title: true,
            price: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.status(200).json(bookings);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get bookings" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
        posts: {
          select: {
            id: true,
            title: true,
          }
        }
      }
    });

    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get users" });
  }
};

export const getProperties = async (req, res) => {
  try {
    const properties = await prisma.post.findMany({
      include: {
        user: {
          select: {
            username: true,
            email: true,
          }
        },
        bookings: {
          select: {
            id: true,
            status: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.status(200).json(properties);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get properties" });
  }
}; 