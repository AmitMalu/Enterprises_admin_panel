import { Navigate, Route } from "react-router-dom";

export const NotFoundRoute = (
  <>
    <Route path="*" element={<Navigate to="/login" />} />
  </>
);
