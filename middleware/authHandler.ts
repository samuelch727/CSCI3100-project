import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";
import dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env.local" });

export default function authHandler(handler: any) {
  return async (req: any, res: any) => {
    console.log("running authHandler middleware");
    try {
      if (!jwtAuth(req, res)) return;
      console.log("running api handler");
      await handler(req, res);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
}

function jwtAuth(req: NextApiRequest, res: NextApiResponse) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (token && process.env.JWT_SECRET) {
    jwt.verify(token, process.env.JWT_SECRET, (err: any, user: any) => {
      if (err) {
        console.log("fail to verify token");
        res.status(400).json({ message: "Authentication fail" });
        return false;
      }
      if (user?.userId && user.userId === req?.body?.userId) {
        console.log("token verified");
        return true;
      }
    });
  } else {
    res.status(400).json({ message: "Authentication fail" });
    return false;
  }
  return true;
}
