// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import authHandler from "../../middleware/authHandler";

type Data = {
  name: string;
};

function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json({ name: "John Doe" });
}

export default authHandler(handler);
