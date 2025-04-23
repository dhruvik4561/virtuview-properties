import authRoutes from "./api/routes/auth.routes.js";
import postRoutes from "./api/routes/post.routes.js";
import bookingRoutes from "./api/routes/booking.routes.js";
import adminRoutes from "./api/routes/admin.routes.js";

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes); 