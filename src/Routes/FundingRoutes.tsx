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
  UpdateTransaction,
} from "../Pages/Funding";

export const FundingRoutes = (
  <>
    <Route
      path="/funding/authorization"
      element={<PreFundingAuth />}
    />
    <Route path="/funding/authorization/add" element={<PrefundingForm />} />
    <Route
      path="/funding/authorization/edit/:id"
      element={<PrefundingForm />}
    />
    <Route path="/funding/credit-debit" element={<CreditDebit />} />
    <Route path="/funding/manage-payment" element={<ManagePayment />} />
    <Route path="/funding/manage-settlement" element={<ManageSettlement />} />
    <Route path="/funding/settlement" element={<Settlement />} />
    <Route path="/funding/update-transaction" element={<UpdateTransaction />} />
    <Route path="/funding/low-balance" element={<LowBalance />} />
    <Route path="/funding/bulk-credit-debit" element={<BulkCreditDebit />} />
  </>
);
