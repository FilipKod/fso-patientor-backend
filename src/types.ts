import { z } from "zod";
import { NewPatientEntrySchema } from "./services/toNewPatientEntry";
import { EntrySchema, NewEntrySchema } from "./services/toNewEntry";

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
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
  entries: Entry[];
}

export type NonSensitivePatientEntry = Omit<PatientEntry, "ssn" | "entries">;

export type NewPatientEntry = z.infer<typeof NewPatientEntrySchema>;

export type Entry = z.infer<typeof EntrySchema>;

export type NewEntry = z.infer<typeof NewEntrySchema>;
