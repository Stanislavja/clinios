import axios from "axios";
import authHeader from "./auth-header";
import { API_BASE } from "./../utils/API_BASE";

class AccountingTypes {
  getAccountingTypes() {
    return axios.get(`${API_BASE}/accounting-types`, {
      headers: authHeader()
    });
  }
}

export default new AccountingTypes();
