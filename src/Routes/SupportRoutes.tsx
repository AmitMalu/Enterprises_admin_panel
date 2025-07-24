import { Route } from "react-router-dom";
import { ContactUs, TicketManagement } from "../Pages/Support";
import TicketingForm from "../Components/Organisms/TicketingForm";

export const SupportRoutes = (
  <>
    <Route path="/support/ticket-management" element={<TicketManagement />} />
    <Route path="/support/ticket-management/:id" element={<TicketingForm />} />
    <Route path="/support/contact-us" element={<ContactUs />} />
  </>
);
