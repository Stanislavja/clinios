import axios from "axios";

import { API_BASE } from "./../utils/API_BASE";
import authHeader from "./auth-header";

class Patient {
  getCardsLayout(user_id) {
    return axios
      .get(API_BASE + `/patient-layout/${user_id}`, { headers: authHeader() })
      .then((res) => res.data);
  }
  getAllergies(patient_id) {
    return axios
      .get(API_BASE + `/patient/${patient_id}/allergies`, {
        headers: authHeader()
      })
      .then((res) => res.data);
  }
  getAllHandouts() {
    return axios
      .get(API_BASE + `/patient-handout`, {
        headers: authHeader()
      })
      .then((res) => res.data);
  }
  getPatientHandouts(patient_id) {
    return axios
      .get(API_BASE + `/patient/${patient_id}/handouts`, {
        headers: authHeader()
      })
      .then((res) => res.data);
  }
  getForms(patient_id) {
    return axios
      .get(API_BASE + `/patient/${patient_id}/forms`, { headers: authHeader() })
      .then((res) => res.data);
  }
  getBillings(patient_id) {
    return axios
      .get(API_BASE + `/patient/${patient_id}/billing`, {
        headers: authHeader()
      })
      .then((res) => res.data);
  }
  getDocuments(patient_id, tab) {
    return axios
      .get(API_BASE + `/patient/${patient_id}/documents/?tab=${tab}`, {
        headers: authHeader()
      })
      .then((res) => res.data);
  }
  getPatientData(patient_id) {
    return axios
      .get(API_BASE + `/patient/${patient_id}`, { headers: authHeader() })
      .then((res) => res.data);
  }
  getNextAppointment(patient_id) {
    return axios
      .get(API_BASE + `/patient/${patient_id}/next-appointment`, {
        headers: authHeader()
      })
      .then((res) => res.data);
  }
  getPatientHistory(patient_id) {
    return axios
      .get(API_BASE + `/patient/${patient_id}/history`, {
        headers: authHeader()
      })
      .then((res) => res.data);
  }
  getPatientBalance(patient_id) {
    return axios
      .get(API_BASE + `/patient/${patient_id}/balance`, {
        headers: authHeader()
      })
      .then((res) => res.data);
  }
  searchPatient(patient_id, data) {
    return axios
      .post(API_BASE + `/patient/${patient_id}/search`, data, {
        headers: authHeader()
      })
      .then((res) => res.data);
  }
  getEncounters(patient_id) {
    return axios
      .get(API_BASE + `/patient/${patient_id}/encounters`, {
        headers: authHeader()
      })
      .then((res) => res.data);
  }
  getMedicalNotes(patient_id) {
    return axios
      .get(API_BASE + `/patient/${patient_id}/medical-notes/history`, {
        headers: authHeader()
      })
      .then((res) => res.data);
  }
  getAdminNotesHistory(patient_id) {
    return axios
      .get(API_BASE + `/patient/${patient_id}/admin-note/history`, {
        headers: authHeader()
      })
      .then((res) => res.data);
  }
  getMessages(patient_id) {
    return axios
      .get(API_BASE + `/patient/${patient_id}/messages`, {
        headers: authHeader()
      })
      .then((res) => res.data);
  }
  getDiagnoses(patient_id, active) {
    return axios
      .get(API_BASE + `/patient/${patient_id}/diagnoses/?active=${active}`, {
        headers: authHeader()
      })
      .then((res) => res.data);
  }
  getMedications(patient_id) {
    return axios
      .get(API_BASE + `/patient/${patient_id}/medications`, {
        headers: authHeader()
      })
      .then((res) => res.data);
  }
  getRequisitions(patient_id) {
    return axios
      .get(API_BASE + `/requisitions/${patient_id}`, {
        headers: authHeader()
      })
      .then((res) => res.data);
  }
  getTests(patient_id) {
    return axios
      .get(API_BASE + `/patient/${patient_id}/all-tests`, {
        headers: authHeader()
      })
      .then((res) => res.data);
  }

  //search methods
  searchAllergies(data) {
    return axios
      .post(API_BASE + `/allergies/search`, data, {
        headers: authHeader()
      })
      .then((res) => res.data);
  }

  searchICD(query) {
    return axios
      .get(API_BASE + `/icd/search/?query=${query}`, {
        headers: authHeader()
      })
      .then((res) => res.data);
  }

  searchDrugs(query) {
    return axios
      .get(API_BASE + `/drug/search/?query=${query}`, {
        headers: authHeader()
      })
      .then((res) => res.data);
  }

  //update methods
  updateCardsLayout(user_id, layout) {
    return axios
      .post(API_BASE + `/patient-layout/${user_id}`, layout, {
        headers: authHeader()
      })
      .then((res) => res.data);
  }

  resetCardsLayout(user_id) {
    return axios
      .delete(API_BASE + `/patient-layout/${user_id}`, {
        headers: authHeader()
      })
      .then((res) => res.data);
  }

  updateAdminNotes(patient_id, data, noteId) {
    return axios.put(API_BASE + `/patient/${patient_id}/admin-note`, data, {
      headers: authHeader()
    });
  }
  // /patient/1/medical-notes/history
  updateMedicalNotes(patient_id, data) {
    return axios.put(
      API_BASE + `/patient/${patient_id}/medical-notes/history`,
      data,
      {
        headers: authHeader()
      }
    );
  }

  updateDiagnoses(data, encounter_id, icd_id) {
    return axios.put(
      API_BASE + `/patient/diagnoses/${encounter_id}/${icd_id}`,
      data,
      {
        headers: authHeader()
      }
    );
  }

  //create methods
  createPatientHandout(patient_id, data) {
    return axios.post(
      API_BASE + `/patient/${patient_id}/patient-handout`,
      data,
      {
        headers: authHeader()
      }
    );
  }

  createDiagnoses(patient_id, data) {
    return axios.post(API_BASE + `/patient/${patient_id}/diagnoses`, data, {
      headers: authHeader()
    });
  }

  createMedication(patient_id, data) {
    return axios.post(API_BASE + `/patient/${patient_id}/medication`, data, {
      headers: authHeader()
    });
  }

  createBilling(patient_id, data) {
    return axios.post(API_BASE + `/patient/${patient_id}/billing`, data, {
      headers: authHeader()
    });
  }

  createDocuments(patient_id, data) {
    return axios.post(API_BASE + `/patient/${patient_id}/documents/`, data, {
      headers: authHeader()
    });
  }

  createAllergy(patient_id, data) {
    return axios.post(API_BASE + `/patient/${patient_id}/allergies`, data, {
      headers: authHeader()
    });
  }

  createMessage(patient_id, data) {
    return axios.post(API_BASE + `/patient/${patient_id}/messages`, data, {
      headers: authHeader()
    });
  }

  //delete methods
  deleteMessages(patient_id, id) {
    return axios.delete(API_BASE + `/patient/${patient_id}/messages/${id}`, {
      headers: authHeader()
    });
  }

  deleteAllergy(patient_id, drug_id) {
    return axios.delete(
      API_BASE + `/patient/${patient_id}/allergies/${drug_id}`,
      {
        headers: authHeader()
      }
    );
  }

  deletePatientHandout(patient_id, handoutId) {
    return axios.delete(
      API_BASE + `/patient/patient-handout/${patient_id}/${handoutId}`,
      {
        headers: authHeader()
      }
    );
  }

  deleteHandout(patient_id, handoutId) {
    return axios.delete(
      API_BASE + `/patient/${patient_id}/handouts/${handoutId}`,
      {
        headers: authHeader()
      }
    );
  }

  updateDocument(patient_id, document_id, body) {
    return axios.put(
      API_BASE + `/patient/${patient_id}/documents/${document_id}`,
      body,
      {
        headers: authHeader()
      }
    );
  }

  deleteDiagnoses(patient_id, icd_id) {
    return axios.delete(
      API_BASE + `/patient/${patient_id}/diagnoses/${icd_id}`,
      {
        headers: authHeader()
      }
    );
  }

  deleteMedications(patient_id, reqBody) {
    return axios.delete(API_BASE + `/patient/${patient_id}/medications/`, {
      headers: authHeader(),
      data: {
        data: reqBody
      }
    });
  }

  deleteRequisitions(encounter_id, cpt_id) {
    return axios.delete(
      API_BASE + `/patient/requisitions/${encounter_id}/${cpt_id}`,
      {
        headers: authHeader()
      }
    );
  }
}

export default new Patient();
