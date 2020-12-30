import axios from "axios";

import { API_BASE } from "../../utils/API_BASE";
import authHeader from "../auth-header";

class HandoutService {
  getHandouts() {
    return axios.get(`${API_BASE}/handouts/`, {
      headers: authHeader(),
    });
  }
}

export default new HandoutService();
