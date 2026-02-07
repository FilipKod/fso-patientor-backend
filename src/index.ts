import express, { Response } from "express";
import cors from "cors";
import { DiagnosesEntry, NonSensitivePatientEntry } from "./types";
import diagnosesService from "./services/diagnosesService";
import patientService from "./services/patientService";
import toNewPatientEntry from "./services/toNewPatientEntry";

const app = express();

const PORT = 3001;

app.use(express.json());
app.use(cors());

app.get("/api/ping", (_req, res) => {
  return res.send("pong");
});

app.get("/api/diagnoses", (_req, res: Response<DiagnosesEntry[]>) => {
  return res.json(diagnosesService.getEntries());
});

app.get("/api/patients", (_req, res: Response<NonSensitivePatientEntry[]>) => {
  return res.json(patientService.getNonSensitiveEntries());
});

app.post("/api/patients", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);

    const addNewPatient = patientService.addPatient(newPatientEntry);
    return res.json(addNewPatient);
  } catch (error) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    return res.status(400).send(errorMessage);
  }
});

app.listen(PORT, () => {
  console.log("server running on port " + PORT);
});
