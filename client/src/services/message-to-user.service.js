import axios from "axios";

import { API_BASE } from "../utils/API_BASE";
import authHeader from "./auth-header";

class Messages {
  getMessageByID(id) {
    return axios
      .get(`${API_BASE}/message-to-user/${id}`, { headers: authHeader() })
      .then((res) => res.data);
  }

  createMessage(payload) {
    return axios.post(`${API_BASE}/message-to-user`, payload, {
      headers: authHeader(),
    }).then((res) => res.data);
  }

  updateMessage(payload) {
    return axios.put(`${API_BASE}/message-to-user/${payload.data.id}`, payload, {
      headers: authHeader(),
    }).then((res) => res.data);
  }

  // TODO:: API endpoint will be updated
  searchUsers(data) {
    return axios
      .post(`${API_BASE}/allergies/search`, data, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }
}

export default new Messages();
