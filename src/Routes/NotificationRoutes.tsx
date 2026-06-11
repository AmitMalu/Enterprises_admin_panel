import { Route } from "react-router-dom";
import {
  AlertType,
  EmailCredentials,
  SmsCredentials,
} from "../Pages/Notification";
// import EmailReportNotification from "../Pages/Notification/EmailReportNotification";
import AlertTypeForm from "../Pages/Notification/AlertTypeForm";
import EmailCredentialsForm from "../Components/Organisms/EmailCredentialsForm";
import SmsCredentialsForm from "../Components/Organisms/SmsCredentialsForm";

export const NotificationRoutes = (
  <>
    <Route path="/notification/alert-type" element={<AlertType />} />
    <Route path="/notification/alert-type/add" element={<AlertTypeForm />} />
    
    <Route path="/notification/email-credentials" element={<EmailCredentials />} />
    <Route path="/notification/email-credentials/add" element={<EmailCredentialsForm mode="add" />} />
    <Route path="/notification/email-credentials/edit/:id" element={<EmailCredentialsForm mode="edit" />} />

    <Route path="/notification/sms-credentials" element={<SmsCredentials />} />
    <Route path="/notification/sms-credentials/add" element={<SmsCredentialsForm mode="add" />} />
    <Route path="/notification/sms-credentials/edit/:id" element={<SmsCredentialsForm mode="edit" />} />
  </>
);
