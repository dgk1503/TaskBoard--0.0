import jwt from "jsonwebtoken";
import user from "../models/User.js";

export const protect = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json({ success: false, message: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await user.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Not Authorized." });
  }
};
