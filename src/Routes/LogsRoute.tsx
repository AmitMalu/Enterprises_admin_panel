import { Route } from "react-router-dom";
import Logs from "../Pages/Logs/Logs";

export const LogsRoute = (
  <>
    <Route path="/logs" element={<Logs />} />
  </>
);
