import axios from "axios";

import { API_BASE } from "../../utils/API_BASE";
import authHeader from "../auth-header";

class PatientPortalService {
  // appointments
  getPractitioners(patient) {
    let url = `${API_BASE}/client-portal/practitioners`;
    if (patient) {
      // eslint-disable-next-line max-len
      url = `${API_BASE}/client-portal/practitioners/?patient_id=${patient.id}&client_id=${patient.client_id}`;
    }
    return axios
      .get(url, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  getAppointmentTypesByPractitionerId(data) {
    return axios
      .post(`${API_BASE}/client-portal/appointment-types`, data, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  bookAppointment(data) {
    return axios
      .post(`${API_BASE}/client-portal/appointment`, data, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  // encounters
  getEncounters(patient) {
    let url = `${API_BASE}/client-portal/encounters`;
    if (patient) {
      // eslint-disable-next-line max-len
      url = `${API_BASE}/client-portal/encounters/?patient_id=${patient.id}&client_id=${patient.client_id}`;
    }
    return axios
      .get(url, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  // lab/documents
  getLabDocuments(patient) {
    let url = `${API_BASE}/client-portal/labs`;
    if (patient) {
      // eslint-disable-next-line max-len
      url = `${API_BASE}/client-portal/labs/?patient_id=${patient.id}&client_id=${patient.client_id}`;
    }
    return axios
      .get(url, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  // Billings
  getBillings(patient) {
    let url = `${API_BASE}/client-portal/billings`;
    if (patient) {
      // eslint-disable-next-line max-len
      url = `${API_BASE}/client-portal/billings/?patient_id=${patient.id}&client_id=${patient.client_id}`;
    }

    return axios
      .get(url, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  createBilling(data) {
    return axios
      .post(`${API_BASE}/client-portal/billings`, data, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  // Payment Methods
  getPaymentMethods(patient) {
    let url = `${API_BASE}/client-portal/payment-methods`;
    if (patient) {
      // eslint-disable-next-line max-len
      url = `${API_BASE}/client-portal/payment-methods/?patient_id=${patient.id}&client_id=${patient.client_id}`;
    }
    return axios
      .get(url, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  // Pharmacies
  searchPharmacies(data) {
    return axios
      .post(`${API_BASE}/pharmacies/search`, data, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  // Requisitions
  getRequisitions(patient) {
    let url = `${API_BASE}/client-portal/lab_requisitions`;
    if (patient) {
      // eslint-disable-next-line max-len
      url = `${API_BASE}/client-portal/lab_requisitions/?patient_id=${patient.id}&client_id=${patient.client_id}`;
    }
    return axios
      .get(url, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }
}

export default new PatientPortalService();
