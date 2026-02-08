import { Request, Response, NextFunction } from "express";
import { NewPatientEntrySchema } from "./services/toNewPatientEntry";
import z from "zod";

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
