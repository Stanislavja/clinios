import axios from "axios";

import { API_BASE } from "../../utils/API_BASE";
import authHeader from "../auth-header";

class PatientPortalService {
  // appointments
  getPractitioners() {
    return axios
      .get(`${API_BASE}/client-portal/practitioners`, {
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
  getEncounters() {
    return axios
      .get(`${API_BASE}/client-portal/encounters`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  // lab/documents
  getLabDocuments() {
    return axios
      .get(`${API_BASE}/client-portal/labs`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  // Billings
  getBillings() {
    return axios
      .get(`${API_BASE}/client-portal/billings`, {
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
  getPaymentMethods() {
    return axios
      .get(`${API_BASE}/client-portal/payment-methods`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  // Pharmacies
  getPharmacies() {
    return axios
      .get(`${API_BASE}/client-portal/pharmacy`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  searchPharmacies(data) {
    return axios
      .post(`${API_BASE}/client-portal/pharmacy/search`, data, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  // Requisitions
  getRequisitions() {
    return axios
      .get(`${API_BASE}/client-portal/lab_requisitions`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }
}

export default new PatientPortalService();
