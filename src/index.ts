import express, { Response, Request } from "express";
import cors from "cors";
import {
  DiagnosesEntry,
  NewEntry,
  NewPatientEntry,
  NonSensitivePatientEntry,
  PatientEntry,
} from "./types";
import diagnosesService from "./services/diagnosesService";
import patientService from "./services/patientService";
import {
  errorMiddleware,
  newEntriesParser,
  newPatientParser,
  NotFoundError,
} from "./utils";

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

router.get("/api/patients/:id", (req, res: Response<PatientEntry | string>) => {
  const id = req.params.id;
  const patient = patientService.getPatient(id);

  if (patient) {
    return res.json(patient);
  } else {
    return res.status(404).send("unknown patient");
  }
});

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

router.post(
  "/api/patients/:id/entries",
  newEntriesParser,
  (req: Request<{ id: string }, unknown, NewEntry>, res) => {
    const { id } = req.params;
    try {
      const entry = req.body;
      const updatedPatient = patientService.addEntry(id, entry);
      return res.json(updatedPatient);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({ error: error.message });
      } else {
        return res.status(500).json({ error: "Internal server error." });
      }
    }
  },
);

router.use(errorMiddleware);

app.use(router);

app.listen(PORT, () => {
  console.log("server running on port " + PORT);
});
