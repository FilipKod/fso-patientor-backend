import express, { Response, Request } from "express";
import cors from "cors";
import {
  DiagnosesEntry,
  NewPatientEntry,
  NonSensitivePatientEntry,
  PatientEntry,
} from "./types";
import diagnosesService from "./services/diagnosesService";
import patientService from "./services/patientService";
import { errorMiddleware, newPatientParser } from "./utils";

const app = express();
const router = express.Router();

const PORT = 3001;

app.use(express.json());
app.use(cors());

router.get("/api/ping", (_req, res) => {
  return res.send("pong");
});

router.get("/api/diagnoses", (_req, res: Response<DiagnosesEntry[]>) => {
  return res.json(diagnosesService.getEntries());
});

router.get(
  "/api/patients",
  (_req, res: Response<NonSensitivePatientEntry[]>) => {
    return res.json(patientService.getNonSensitiveEntries());
  },
);

router.post(
  "/api/patients",
  newPatientParser,
  (
    req: Request<unknown, unknown, NewPatientEntry>,
    res: Response<PatientEntry>,
  ) => {
    const addNewPatient = patientService.addPatient(req.body);
    return res.json(addNewPatient);
  },
);

router.use(errorMiddleware);

app.use(router);

app.listen(PORT, () => {
  console.log("server running on port " + PORT);
});
