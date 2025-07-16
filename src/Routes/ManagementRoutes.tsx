import { Route } from "react-router-dom";
import UserFormPage from "../Components/Organisms/UserFormPage";
import {
  ActivationUser,
  AddManageUser,
  BlockUser,
  KycApprovedSummary,
  PendingKyc,
  PendingUser,
  SearchUser,
  SettlementBank,
  UserCreation,
  UserConfiguration,
  UserMapping,
  ViewUser,
} from "../Pages/Management";
import OnboardedUsers from "../Pages/Management/OnboardedUsers";
import UserConfigForm from "../Components/Organisms/UserConfigForm";

export const ManagementRoutes = (
  <>
    <Route path="/management/user-creation" element={<UserCreation />} />
    <Route path="/management/user/create/:type" element={<UserFormPage />} />
    <Route path="/management/user/pending" element={<PendingUser />} />
    <Route path="/management/user/activation" element={<ActivationUser />} />
    <Route path="/management/user-configuration" element={<UserConfiguration />} />
    <Route path="/management/userconfig/edit/:id" element={<UserConfigForm mode="edit" />} />
    <Route path="/management/userconfig/add" element={<UserConfigForm mode="add" />} />
    <Route path="/management/add-manage-user" element={<AddManageUser />} />
    <Route path="/management/search-user" element={<SearchUser />} />
    <Route path="/management/user/onboarded" element={<OnboardedUsers />} />
    <Route path="/management/kyc-approved" element={<KycApprovedSummary />} />
    <Route path="/management/kyc-pending" element={<PendingKyc />} />
    <Route path="/management/view-user" element={<ViewUser />} />
    <Route path="/management/block-user" element={<BlockUser />} />
    <Route path="/management/settlement-bank" element={<SettlementBank />} />
    <Route path="/management/user-mapping" element={<UserMapping />} />
  </>
);
