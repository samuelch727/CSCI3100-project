// Handle user authentication related functions.
// Example: Login, logout, register, etc.
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import dbConnect from "../../../models/dbconnect";
import user from "../../../models/User";
import bcrypt from "bcrypt";

function generateToken(req: NextApiRequest): Boolean {
  const { userId } = req.body;
  if (!userId) {
    console.log("userID not given in req.body");
    return false;
  }
  if (process.env.JWT_SECRET) {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    req.body = { userId, token };
    return true;
  } else {
    console.log("JWT_SECRET not defined");
    return false;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { action } = req.query;
  console.log(action);
  if (req.method === "POST") {
    switch (action) {
      case "login":
        if (generateToken(req)) {
          return res.status(200).json(req.body);
        } else {
          return res.status(500).json({ message: "Internal Server Error" });
        }
        break;
      case "signup":
        await singUp(req, res);
        return;
        break;
    }
  }
  return res.status(400).json({ message: "Bad Request" });
}

async function singUp(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  if (!req.body.password) {
    return res.status(400).json({ message: "Password not given" });
  }
  bcrypt.hash(req.body.password, 10, async (err, hash) => {
    if (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
    const newUser = new user({ ...req.body, password: hash });
    if (newUser.validateSync()) {
      console.log("Schema validation error");
      res.status(400).json({ error: "Bad request" });
      return;
    }
    try {
      const createdUser = await newUser.save();
      req.body = { userId: createdUser._id };
      generateToken(req);
      res.status(201).json(req.body);
    } catch (err) {
      console.log("Error when creating user");
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
}
