import { Route } from "react-router-dom";
import {
  AlertType,
  SendMail,
  SendSms,
  SmsTemplate,
} from "../Pages/Notification";
import EmailReportNotification from "../Pages/Notification/EmailReportNotification";
import AlertTypeForm from "../Pages/Notification/AlertTypeForm";

export const NotificationRoutes = (
  <>
    <Route path="/notification/alert-type" element={<AlertType />} />
    <Route path="/notification/alert-type/add" element={<AlertTypeForm />} />
    <Route path="/notification/sms-template" element={<SmsTemplate />} />
    <Route
      path="/notification/email-report"
      element={<EmailReportNotification />}
    />
    <Route path="/notification/send-sms" element={<SendSms />} />
    <Route path="/notification/send-mail" element={<SendMail />} />
  </>
);
