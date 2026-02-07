import { Gender, NewPatientEntry } from "../types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect date: " + date);
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect gender: " + gender);
  }
  return gender;
};

const parseStringInput = (input: unknown, label: string): string => {
  if (!isString(input)) {
    throw new Error(`Incorrect ${label}: ${input}`);
  }
  return input;
};

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data.");
  }

  if (
    "dateOfBirth" in object &&
    "gender" in object &&
    "name" in object &&
    "occupation" in object &&
    "ssn" in object
  ) {
    const newEntry: NewPatientEntry = {
      dateOfBirth: parseDate(object.dateOfBirth),
      gender: parseGender(object.gender),
      name: parseStringInput(object.name, "name"),
      occupation: parseStringInput(object.occupation, "occupation"),
      ssn: parseStringInput(object.ssn, "ssn"),
    };

    return newEntry;
  }

  throw new Error("Incorrect data: same fields are missing.");
};

export default toNewPatientEntry;
