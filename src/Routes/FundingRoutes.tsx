import { Route } from "react-router-dom";
import PrefundingForm from "../Components/Organisms/PrefundingForm";
import {
  BulkCreditDebit,
  CreditDebit,
  LowBalance,
  ManagePayment,
  ManageSettlement,
  PreFundingAuth,
  Settlement,
} from "../Pages/Funding";

export const FundingRoutes = (
  <>
    <Route
      path="/funding/pre-funding-authorization"
      element={<PreFundingAuth />}
    />
    <Route path="/prefunding/add" element={<PrefundingForm mode="add" />} />
    <Route
      path="/prefunding/edit/:id"
      element={<PrefundingForm mode="edit" />}
    />
    <Route path="/funding/credit-debit" element={<CreditDebit />} />
    <Route path="/funding/manage-payment" element={<ManagePayment />} />
    <Route path="/funding/manage-settlement" element={<ManageSettlement />} />
    <Route path="/funding/settlement" element={<Settlement />} />
    <Route path="/funding/low-balance" element={<LowBalance />} />
    <Route path="/funding/bulk-credit-debit" element={<BulkCreditDebit />} />
  </>
);
