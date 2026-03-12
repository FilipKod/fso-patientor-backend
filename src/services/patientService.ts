import patientsData from "../data/patients";
import { v4 as uuid } from "uuid";
import {
  PatientEntry,
  NonSensitivePatientEntry,
  NewPatientEntry,
  Entry,
  NewEntry,
} from "../types.js";
import { NotFoundError } from "../utils";

const getEntries = (): PatientEntry[] => {
  return patientsData;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patientsData.map(({ id, dateOfBirth, gender, name, occupation }) => ({
    id,
    dateOfBirth,
    gender,
    name,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatient: PatientEntry = {
    id: uuid(),
    ...entry,
    entries: [],
  };

  patientsData.push(newPatient);
  return newPatient;
};

const getPatient = (id: string): PatientEntry | undefined => {
  const patient = patientsData.find((p) => p.id === id);

  if (!patient) {
    return undefined;
  }

  return {
    ...patient,
    entries: patient.entries || [],
  };
};

const addEntry = (id: string, entry: NewEntry): PatientEntry => {
  const patient = patientsData.find((p) => p.id === id);
  if (!patient) {
    throw new NotFoundError("Patient not found");
  }
  const newEntry: Entry = {
    id: uuid(),
    ...entry,
  };
  patient.entries.push(newEntry);
  return patient;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  getPatient,
  addEntry,
};
