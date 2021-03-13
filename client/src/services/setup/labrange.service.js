import axios from "axios";

import { API_BASE } from "../../utils/API_BASE";
import authHeader from "../auth-header";

class LabRangeService {
  getLabRanges() {
    return axios.get(`${API_BASE}/client-ranges`, {
      headers: authHeader(),
    }).then((res) => res.data);
  }

  searchTests(data) {
    return axios.post(`${API_BASE}/client-range/tests/search`, data, {
      headers: authHeader(),
    }).then((res) => res.data);
  }

  createLabRange(data) {
    return axios.post(`${API_BASE}/client-range`, data, {
      headers: authHeader(),
    }).then((res) => res.data);
  }

  updateLabRange(data) {
    return axios.put(`${API_BASE}/client-range`, data, {
      headers: authHeader(),
    }).then((res) => res.data);
  }

  deleteLabRange(reqBody) {
    return axios.delete(`${API_BASE}/client-range`, {
      headers: authHeader(),
      data: reqBody,
    }).then((res) => res.data);
  }

  resetLabRanges() {
    return axios.post(`${API_BASE}/client-range/reset`, null, {
      headers: authHeader(),
    }).then((res) => res.data);
  }
}

export default new LabRangeService();
