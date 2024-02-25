import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface IGetUserAuthInfoRequest extends Request {
  user?: string | object;
}

require("dotenv").config();

const verifyToken = (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

  try {
    const decoded: any = jwt.verify(token, process.env.TOKEN_KEY as string);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }

  return next();
};

export default verifyToken;

