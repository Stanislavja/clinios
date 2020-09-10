"use strict";

const express = require("express");
const { authJwt } = require("../../app/middlewares");
const Patient = require("../controllers/patient.controller.js");
const validation = require("./../helpers/validations/patient.js");
const router = express.Router();

// clients Routes
router.get("/patient", [authJwt.verifyToken], Patient.getPatient);
router.get(
  "/patient/search",
  [authJwt.verifyToken, validation.validate("search")],
  Patient.search
);
router.get("/patient/history", [authJwt.verifyToken], Patient.history);
router.get(
  "/patient/admin-note/history",
  [authJwt.verifyToken],
  Patient.AdminNotehistory
);
router.put(
  "/patient/admin-note/:id",
  [authJwt.verifyToken, validation.validate("adminNoteupdate")],
  Patient.adminNoteupdate
);
router.get("/patient/forms", [authJwt.verifyToken], Patient.getForms);
router.get(
  "/patient/forms/:id",
  [authJwt.verifyToken, validation.validate("singleForm")],
  Patient.getFormById
);
router.get("/patient/handouts", [authJwt.verifyToken], Patient.handouts);
router.delete(
  "/patient/handouts/:id",
  [authJwt.verifyToken, validation.validate("handoutDelete")],
  Patient.handoutDelete
);
router.get(
  "/patient/patient-handout",
  [authJwt.verifyToken],
  Patient.patientHandouts
);
router.post(
  "/patient/patient-handout",
  [authJwt.verifyToken, validation.validate("CreatePatientHandouts")],
  Patient.CreatePatientHandouts
);
router.delete(
  "/patient/patient-handout/:patient_id/:handout_id",
  [authJwt.verifyToken, validation.validate("DeletePatientHandouts")],
  Patient.DeletePatientHandouts
);
router.get("/patient/billing", [authJwt.verifyToken], Patient.getBilling);
router.get("/patient/allergies", [authJwt.verifyToken], Patient.getAllergies);
router.delete(
  "/patient/allergies/:patient_id/:drug_id",
  [authJwt.verifyToken, validation.validate("deleteAllergy")],
  Patient.deleteAllergy
);
router.get(
  "/patient/allergies/search",
  [authJwt.verifyToken, validation.validate("search")],
  Patient.searchAllergies
);
router.post(
  "/patient/allergies",
  [authJwt.verifyToken, validation.validate("createPatientAllergy")],
  Patient.createPatientAllergy
);

module.exports = router;