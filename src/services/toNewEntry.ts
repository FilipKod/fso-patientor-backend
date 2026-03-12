import z from "zod";
import { HealthCheckRating } from "../types";

const BaseEntry = z.object({
  description: z.string(),
  date: z.iso.date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

const HealthCheckEntry = BaseEntry.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.enum(HealthCheckRating),
});

const OccupationalHealthcareEntry = BaseEntry.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.iso.date(),
      endDate: z.iso.date(),
    })
    .optional(),
});

const HospitalEntry = BaseEntry.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.iso.date(),
    criteria: z.string(),
  }),
});

export const NewEntrySchema = z.discriminatedUnion("type", [
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
]);

export const EntrySchema = NewEntrySchema.and(z.object({ id: z.string() }));
