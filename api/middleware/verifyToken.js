import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ 
      success: false,
      message: "Not Authenticated! Please login again." 
    });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = payload.id;
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    return res.status(403).json({ 
      success: false,
      message: "Token is not valid! Please login again." 
    });
  }
};
