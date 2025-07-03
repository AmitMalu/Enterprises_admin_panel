import { Route } from "react-router-dom";
import UserFormPage from "../Components/Organisms/UserFormPage";
import {
  ActivationUser,
  AddManageUser,
  BlockUser,
  BulkUsers,
  KycApprovedSummary,
  PendingKyc,
  PendingUser,
  SearchUser,
  SettlementBank,
  UserCreation,
  UserManagement,
  UserMapping,
  ViewUser,
} from "../Pages/Management";

export const ManagementRoutes = (
  <>
    <Route path="/management/user-creation" element={<UserCreation />} />
    <Route path="/management/user/create/:type" element={<UserFormPage />} />
    <Route path="/management/user/pending" element={<PendingUser />} />
    <Route path="/management/user/activation" element={<ActivationUser />} />
    <Route path="/management/user-management" element={<UserManagement />} />
    <Route path="/management/add-manage-user" element={<AddManageUser />} />
    <Route path="/management/search-user" element={<SearchUser />} />
    <Route path="/management/bulk-users" element={<BulkUsers />} />
    <Route path="/management/kyc-approved" element={<KycApprovedSummary />} />
    <Route path="/management/kyc-pending" element={<PendingKyc />} />
    <Route path="/management/view-user" element={<ViewUser />} />
    <Route path="/management/block-user" element={<BlockUser />} />
    <Route path="/management/settlement-bank" element={<SettlementBank />} />
    <Route path="/management/user-mapping" element={<UserMapping />} />
  </>
);
