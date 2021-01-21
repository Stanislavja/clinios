import axios from "axios";

import { API_BASE } from "../../utils/API_BASE";
import authHeader from "../auth-header";

class LabRangeService {
  getLabRanges() {
    return axios.get(`${API_BASE}/lab-range/`, {
      headers: authHeader(),
    });
  }

  createLabRange(data) {
    return axios.post(`${API_BASE}/lab-range/`, data, {
      headers: authHeader(),
    });
  }

  deleteLabRange(id) {
    return axios.delete(`${API_BASE}/lab-range/${id}`, {
      headers: authHeader(),
    });
  }
}

export default new LabRangeService();
