import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../../models/User.js";
import { sendVerificationEmail } from "../config/nodeMailer.js";

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

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
    const verifyOtp = generateOTP();
    const verifyOTPat = Date.now() + 600000;

    const user = new userModel({
      name,
      email,
      password: hashed_pass,
      verifyOtp,
      verifyOTPat,
      isAcountVerified: false,
    });

    await user.save();
    await sendVerificationEmail(email, verifyOtp);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 604800000,
    });

    return res.json({
      success: true,
      message: "Check your email for verification code.",
    });
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

    // set cookie so frontend can use it for authenticated requests
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

export const verifyEmail = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await userModel.find({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found." });
    }

    if (user.verifyOtp !== otp) {
      return res.json({
        success: false,
        message: "Invalid Verification code.",
      });
    }

    if (Date.now() > verifyOTPat) {
      return res.json({
        success: false,
        message: "Verification code expired.",
      });
    }

    user.isAcountVerified = true;
    user.verifyOtp = "";
    user.verifyOTPat = 0;
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

    return res.json({
      success: true,
      message: "Email Verification comeplete !",
    });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};

export const getMe = async (req, res) => {
  try {
    if (!req.user)
      return res
        .status(401)
        .json({ success: false, message: "Not authenticated" });
    // ensure password isn't sent
    const { password, verifyOtp, verifyOTPat, ...safeUser } = req.user.toObject
      ? req.user.toObject()
      : req.user;
    return res.json({ success: true, user: safeUser });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
