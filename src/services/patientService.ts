import patientsData from "../data/patients";
import { v4 as uuid } from "uuid";
import {
  PatientEntry,
  NonSensitivePatientEntry,
  NewPatientEntry,
} from "../types.js";

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

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  getPatient,
};
