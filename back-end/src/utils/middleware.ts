import { Request, Response, NextFunction } from "express";
import firebase from "../database/firebase";
import { Message, Name } from "../types/errorType.model";
import { CustomRequest } from "../types/httpType.model";
import { createError } from "./ErrorCreate";

export const checkToken = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(createError(Name.Authorization, Message.HeaderMissing));
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
  return res.status(404).json({ error: Message.UnknownEndPoint });
};

export const errorHandler = (err: Error, req: CustomRequest, res: Response, next: NextFunction) => {
  if (err.name === Name.Authorization) {
    return res.status(401).send(err.message);
  }
  if (err.name === Name.Auth_Argument_Error) {
    return res.status(401).send(err.message);
  }
  if (err.name === Name.Auth_Token_Expired) {
    return res.status(401).send(err.message);
  }
  if (err.name === Name.BadRequestError400) {
    return res.status(400).send(err.message);
  }
  if (err.name === Name.BadRequestError404) {
    return res.status(404).send(err.message);
  }

  return res.status(500).send(Message.ServerBroken);
};
