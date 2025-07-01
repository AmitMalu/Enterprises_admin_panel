import { Route } from "react-router-dom";
import SchemeSettingsPage from "../Pages/Schemes/SchemeSettingsPage";
import {
  FeeDistributionSetting,
  FeeSetting,
  SchemesList,
  ServiceChargeSetting,
  TransactionLimitSetting,
  TransactionRouting,
} from "../Pages/Schemes";
import SchemesFormPage from "../Components/Organisms/SchemesFormPage";

export const SchemesRoutes = (
  <>
    <Route path="/schemes/schemeslist" element={<SchemesList />} />
    <Route path="/schemes/add" element={<SchemesFormPage mode="add" />} />
    <Route path="/schemes/edit/:id" element={<SchemesFormPage mode="edit" />} />
    <Route path="/schemes/setting/:id" element={<SchemeSettingsPage />} />

    <Route
      path="/schemes/fee-distribution"
      element={<FeeDistributionSetting />}
    />
    <Route path="/schemes/fee-setting" element={<FeeSetting />} />
    <Route
      path="/schemes/transaction-routing"
      element={<TransactionRouting />}
    />
    <Route
      path="/schemes/transaction-limit"
      element={<TransactionLimitSetting />}
    />
    <Route path="/schemes/service-charge" element={<ServiceChargeSetting />} />
  </>
);
