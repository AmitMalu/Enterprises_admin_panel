import { Route } from "react-router-dom";
import UserFormPage from "../Components/Organisms/UserFormPage";
import {
  KycApprovedSummary,
  PendingKyc,
  PendingUser,
  SearchUser,
  SettlementBank,
  UserCreation,
  UserConfiguration,
  UserMapping,
  ViewUser,
  RejectedUser,
  AdminUser,
  BlockUnblockUser,
} from "../Pages/Management";
import OnboardedUsers from "../Pages/Management/OnboardedUsers";
import UserConfigForm from "../Components/Organisms/UserConfigForm";
import PendingUserForm from "../Components/Organisms/PendingUserForm";
import AdminUserForm from "../Components/Organisms/AdminUserForm";
import PendingKycView from "../Pages/Management/PendingKycView";
import OnboardedUserForm from "../Components/Organisms/OnboardedUserForm";
import WhitelabelBranding from "../Pages/Management/WhitelabelBranding";
import WhitelabelBrandingForm from "../Components/Organisms/WhitelabelBrandingForm";

export const ManagementRoutes = (
  <>
    <Route path="/management/user/create" element={<UserCreation />} />
    <Route path="/management/user/create/:type" element={<UserFormPage />} />
    <Route path="/management/user/pending" element={<PendingUser />} />
    <Route path="/management/user/pending/:type/:id" element={<PendingUserForm />} />
    <Route path="/management/user/pending/edit/:type/:id" element={<PendingUserForm />} />
    <Route path="/management/user/onboarded" element={<OnboardedUsers />} />
    <Route path="/management/user/onboarded/edit/:type/:id" element={<OnboardedUserForm />} />
    <Route path="/management/user/rejected" element={<RejectedUser />} />
    <Route path="/management/user-configuration" element={<UserConfiguration />} />
    <Route path="/management/user-configuration/edit/:id" element={<UserConfigForm mode="edit" />} />
    <Route path="/management/user-configuration/add" element={<UserConfigForm mode="add" />} />
    <Route path="/management/admin-user" element={<AdminUser />} />
    <Route path="/management/admin-user/:id" element={<AdminUserForm mode="edit" />} />
    <Route path="/management/admin-user/add" element={<AdminUserForm mode="add" />} />
    <Route path="/management/search-user" element={<SearchUser />} />
    <Route path="/management/kyc-approved" element={<KycApprovedSummary />} />
    <Route path="/management/kyc-pending" element={<PendingKyc />} />
    <Route path="/management/kyc-pending/:id" element={<PendingKycView />} />
    <Route path="/management/view-user" element={<ViewUser />} />
    <Route path="/management/block-unblock-user" element={<BlockUnblockUser />} />
    <Route path="/management/settlement-bank" element={<SettlementBank />} />
    <Route path="/management/user-mapping" element={<UserMapping />} />
    <Route path="/management/whitelabel-branding" element={<WhitelabelBranding />} />
    <Route path="/management/whitelabel-branding/add" element={<WhitelabelBrandingForm mode="add" />} />
    <Route path="/management/whitelabel-branding/edit/:id" element={<WhitelabelBrandingForm mode="edit" />} />
  </>
);
