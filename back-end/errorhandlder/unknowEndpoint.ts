import { Response, Request } from "express";

const unknowEndpoint = (_req: Request, response: Response) => {
  return response.status(404).json({ error: "unknown endpoint" });
};

export default unknowEndpoint;
