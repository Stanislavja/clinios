import axios from "axios";
import authHeader from "./auth-header";
import { API_BASE } from "./../utils/API_BASE";

class ReportFinanceDetail {
  getReportFinanceDetail(dateFrom, dateTo) {
    return axios.get(
      API_BASE + `/report-finance-detail?dateFrom=${dateFrom}&dateTo=${dateTo}`,
      {
        headers: authHeader()
      }
    );
  }
}

export default new ReportFinanceDetail();
