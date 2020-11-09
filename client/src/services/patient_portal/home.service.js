import axios from "axios";

import { API_BASE } from "../../utils/API_BASE";
import authHeader from "../auth-header";

class HomeService {
  getClientHeader() {
    return axios
      .get(`${API_BASE}/client-portal/header`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  getClientForms() {
    return axios
      .get(`${API_BASE}/client-portal/forms`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  getUpcomingAppointments() {
    return axios
      .get(`${API_BASE}/client-portal/upcoming-appointments`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }
}

export default new HomeService();
