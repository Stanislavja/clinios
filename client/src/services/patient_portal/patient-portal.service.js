import axios from "axios";

import { API_BASE } from "../../utils/API_BASE";
import authHeader from "../auth-header";

class PatientPortalService {
  getEncounters() {
    return axios
      .get(`${API_BASE}/client-portal/encounters`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  getLabDocuments() {
    return axios
      .get(`${API_BASE}/client-portal/labs`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }
}

export default new PatientPortalService();
