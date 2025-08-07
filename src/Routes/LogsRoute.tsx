import { Route } from "react-router-dom";
import Logs from "../Pages/ReportLogs/Logs";

export const LogsRoute = (
  <>
    <Route path="/logs" element={<Logs />} />
  </>
);
