import { Route } from "react-router-dom";
import { ContactUs, TicketManagement } from "../Pages/Support";

export const SupportRoutes = (
  <>
    <Route path="/support/ticket-management" element={<TicketManagement />} />
    <Route path="/support/contact-us" element={<ContactUs />} />
  </>
);
