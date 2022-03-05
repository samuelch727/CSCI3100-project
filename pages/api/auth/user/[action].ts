// Handle user authentication related functions.
// Example: Login, logout, register, etc.
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

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

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { action } = req.query;
  console.log(`action: ${action}`);
  if (req.method === "POST") {
    switch (action) {
      case "login":
        if (generateToken(req)) {
          return res.status(200).json(req.body);
        } else {
          return res.status(500).json({ message: "Internal Server Error" });
        }
        break;
    }
  }
  return res.status(400).json({ message: "Bad Request" });
}
