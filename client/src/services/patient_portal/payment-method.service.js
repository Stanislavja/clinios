import axios from "axios";

import { API_BASE } from "../../utils/API_BASE";
import authHeader from "../auth-header";

class PaymentMethodService {
  // patient profile
  getPaymentMethods() {
    return axios
      .get(`${API_BASE}/patient-portal/payment-methods`, { headers: authHeader() })
      .then((res) => res.data);
  }

  create(data) {
    return axios
      .post(`${API_BASE}/patient-portal/payment-methods`, data, { headers: authHeader() })
      .then((res) => res.data);
  }
}

export default new PaymentMethodService();
