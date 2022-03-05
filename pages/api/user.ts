import type { NextApiRequest, NextApiResponse } from "next";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import user from "../../models/User";
import dbConnect from "../../models/dbconnect";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await dbConnect();
    const { username } = req.body;
    const newUser = new user({ username });
    if (newUser.validateSync()) {
      console.log("Validation error");
      res.status(400).json({ error: "Bad request" });
      return;
    }
    try {
      const createdUser = await newUser.save();
      res.status(201).json({ _id: createdUser._id });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
  res.status(400).json({ error: "Not found" });
}
