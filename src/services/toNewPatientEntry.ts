import { Gender } from "../types";
import z from "zod";

export const NewPatientEntrySchema = z.object({
  dateOfBirth: z.iso.date(),
  gender: z.enum(Gender),
  name: z.string(),
  occupation: z.string(),
  ssn: z.string(),
});
