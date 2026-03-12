import { Request, Response, NextFunction } from "express";
import { NewPatientEntrySchema } from "./services/toNewPatientEntry";
import z from "zod";
import { NewEntrySchema } from "./services/toNewEntry";

export const newPatientParser = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    NewPatientEntrySchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

export const newEntriesParser = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    NewEntrySchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

export const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof z.ZodError) {
    res.status(400).json({ error: error.issues });
  } else {
    next(error);
  }
};

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}
