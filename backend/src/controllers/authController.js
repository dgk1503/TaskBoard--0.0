import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../../models/User.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name | !email | !password) {
    return res.json({ success: false, message: "Missing details" });
  }

  try {
    const existing_user = await userModel.findOne({ email });

    if (existing_user) {
      return res.json({ success: false, message: "User already exists" });
    }
    const hashed_pass = await bcrypt.hash(password, 20);

    const user = new userModel({ name, email, password: hashed_pass });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 604800000,
    });

    return res.json({ success: true });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "Email and password are required",
    });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "No user found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 604800000,
    });

    return res.json({ success: true });
  } catch (err) {
    res.json({ success: false, message: "Log in error " });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.json({ success: true, message: "Logged out" });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};
