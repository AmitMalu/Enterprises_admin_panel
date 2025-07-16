import { Route } from "react-router-dom";
import SchemeSettingsPage from "../Pages/Schemes/SchemeSettingsPage";
import {
  EditSchemeAllocation,
  FeeDistributionSetting,
  FeeSetting,
  SchemeAllocation,
  SchemeHierarchy,
  SchemeRate,
  SchemesList,
  ServiceChargeSetting,
  TransactionLimitSetting,
  TransactionRouting,
} from "../Pages/Schemes";
import SchemesFormPage from "../Components/Organisms/SchemesFormPage";
import SchemeHierarchyForm from "../Components/Organisms/SchemeHierarchyForm";

export const SchemesRoutes = (
  <>
    <Route path="/schemes/schemeslist" element={<SchemesList />} />
    <Route path="/schemes/add" element={<SchemesFormPage mode="add" />} />
    <Route path="/schemes/edit/:id" element={<SchemesFormPage mode="edit" />} />
    <Route path="/schemes/setting" element={<SchemeSettingsPage />} />

    <Route path="/schemes/hierarchy" element={<SchemeHierarchy />} />
    <Route path="/schemes/hierarchy/edit/:id" element={<SchemeHierarchyForm mode="edit" />} />
    <Route path="/schemes/hierarchy/add" element={<SchemeHierarchyForm mode="add" />} />

    <Route path="/schemes/rate" element={<SchemeRate />} />
    <Route path="/schemes/allocation" element={<SchemeAllocation />} />
    <Route path="/schemes/allocation/edit/:id" element={<EditSchemeAllocation />} />

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
