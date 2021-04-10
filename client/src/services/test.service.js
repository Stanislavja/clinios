import axios from "axios";

import { API_BASE } from "../utils/API_BASE";
import authHeader from "./auth-header";

class Tests {
  getAllTests() {
    return axios.get(`${API_BASE}/tests`, { headers: authHeader() });
  }

  getTestCptName(cptId) {
    return axios.get(`${API_BASE}/tests/page-title/${cptId}`, {
      headers: authHeader(),
    });
  }

  getLabCpt(patientId) {
    return axios.get(`${API_BASE}/tests/lab-cpt/${patientId}`, {
      headers: authHeader(),
    });
  }

  getTestGraph(patientId, labId) {
    return axios.get(`${API_BASE}/tests/graph/${patientId}/${labId}`, {
      headers: authHeader(),
    });
  }

  getConventionalRange(patientId, cptId) {
    return axios.get(
      `${API_BASE}/tests/conventionalrange/${patientId}/${cptId}`,
      { headers: authHeader() }
    );
  }

  getConventionalRange(patientId, cptId) {
    return axios.get(
      `${API_BASE}/tests/conventionalrange/${patientId}/${cptId}`,
      { headers: authHeader() }
    );
  }

  getConventionalRange(patientId, cptId) {
    return axios.get(`${API_BASE}/tests/conventionalrange/${patientId}/${cptId}`, { headers: authHeader() });
  }
}

export default new Tests();
