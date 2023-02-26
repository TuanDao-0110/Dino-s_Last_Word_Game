import { Request, Response, NextFunction } from "express";
import firebase from "../database/firebase";
import { createError } from "./ErrorCreate";
interface CustomRequest extends Request {
  currentUser?: any;
}

export const checkToken = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(createError("Authorization", "Authorization header missing"));
  }
  const token = authHeader.split("Bearer ")[1];
  try {
    const decodedToken = await firebase.verifyIdToken(token);
    req.currentUser = decodedToken; // add currentUser property to request object
    return next();
  } catch (error: any) {
    return next(createError(error.code, error.message));
  }
};

export const unknowEndpoint = (req: Request, res: Response) => {
  return res.status(404).json({ error: "unknown endpoint" });
};

export const errorHandler = (err: Error, req: CustomRequest, res: Response, next: NextFunction) => {
  if (err.name === "Authorization") {
    return res.status(401).send(err.message);
  }
  if (err.name === "auth/argument-error") {
    return res.status(401).send(err.message);
  }
  return res.status(500).send("Something broke!");
};
