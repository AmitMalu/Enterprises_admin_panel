import { Route } from "react-router-dom";
import { DesignDocuments, DesignReceipts, Profile } from "../Pages/Account";

export const MyAccountRoutes = (
  <>
    <Route path="/account/profile" element={<Profile />} />
    <Route path="/account/design-receipts" element={<DesignReceipts />} />
    <Route path="/account/design-documents" element={<DesignDocuments />} />
  </>
);
