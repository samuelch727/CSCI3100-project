// Handel auth fail from middleware
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(400).json({ message: "Authentication fail" });
}
