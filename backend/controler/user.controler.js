import mongoose from "mongoose";
import axios from "axios";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Check if user exists with either username or email
    const existingUser = await User.findOne({ 
      $or: [
        { username: username },
        { email: email }
      ]
    });

    if (existingUser) {
      return res.status(400).json({ msg: `User already exists` });
    }

    let user = new User({
      username,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const payload = { userId: user.id };
    const token = jsonwebtoken.sign(payload, process.env.JWT_SECRET);

    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};
