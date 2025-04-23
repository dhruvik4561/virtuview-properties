import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  getAdminStats,
  getAdminBookings,
  getAdminUsers,
  getAdminProperties
} from "../controllers/admin.controller.js";

const router = express.Router();

// Apply verifyToken middleware to all admin routes
router.use(verifyToken);

// Dashboard statistics
router.get("/stats", getAdminStats);

// Get all bookings
router.get("/bookings", getAdminBookings);

// Get all users
router.get("/users", getAdminUsers);

// Get all properties
router.get("/properties", getAdminProperties);

export default router; 