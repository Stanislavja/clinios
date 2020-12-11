import axios from "axios";

import { API_BASE } from "../../utils/API_BASE";
import authHeader from "../auth-header";

class MessagesService {
  getMessages = () => axios.get(`${API_BASE}/client-portal/messages`, {
    headers: authHeader(),
  });
}

export default new MessagesService();
