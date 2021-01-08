import axios from "axios";

import { API_BASE } from "../utils/API_BASE";
import authHeader from "./auth-header";

class LabService {
  // Lab by Id
  getLabById(labId) {
    return axios
      .get(`${API_BASE}/lab/${labId}`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  // User History
  getUserHistory(userId) {
    return axios
      .get(`${API_BASE}/lab/user-history/${userId}`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  // Lab History
  getLabHistory(labId) {
    return axios
      .get(`${API_BASE}/lab/history/${labId}`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  // Lab Values
  getLabValues(labId) {
    return axios
      .get(`${API_BASE}/lab/values/${labId}`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  // Assignee Users
  getAssigneeUsers() {
    return axios
      .get(`${API_BASE}/lab/assign-user`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }
}

export default new LabService();
