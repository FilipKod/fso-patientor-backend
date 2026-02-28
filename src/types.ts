import { z } from "zod";
import { NewPatientEntrySchema } from "./services/toNewPatientEntry";

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface DiagnosesEntry {
  code: string;
  name: string;
  latin?: string;
}

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: string[];
}

export type NonSensitivePatientEntry = Omit<PatientEntry, "ssn" | "entries">;

export type NewPatientEntry = z.infer<typeof NewPatientEntrySchema>;

export interface Entry {
  id: string;
  description: string;
  createAt: string;
  diagnoseCode: string;
  specialist: string;
}
