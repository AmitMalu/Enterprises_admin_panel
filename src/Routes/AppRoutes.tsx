import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "../Components/Layout/AuthLayout";
import MainLayout from "../Components/Layout/MainLayout";
import LoginPage from "../Pages/Auth/LoginPage";
import OtpVerify from "../Pages/Auth/OtpVerify";
import ForgetPassword from "../Pages/Auth/ForgetPassword";
import SetPassword from "../Pages/Auth/SetPassword";
import UserCreation from "../Pages/Management/UserCreation";
import UserFormPage from "../Components/Organisms/UserFormPage";
import ProtectedRoutes from "./ProtectedRoutes";
import PreFundingAuth from "../Pages/Funding/PreFundingAuth";
import PrefundingForm from "../Components/Organisms/PrefundingForm";
import SchemesList from "../Pages/Schemes/SchemesList";
import SchemeSettingsPage from "../Pages/Schemes/SchemeSettingsPage";
import {
  ApiMaster,
  BankMaster,
  BusinessMaster,
  CountryMaster,
  DropdownMaster,
  KycMaster,
  OperatorMaster,
  PaymentMaster,
  ProductMaster,
  ProfileMaster,
  RegistrationMaster,
  ServiceConfigurationMaster,
  SubOperatorMaster,
  SubProductMaster,
  SystemConfigurationMaster,
  TaxMaster,
  TicketMaster,
  UserConfigurationMaster,
  VendorMaster,
  WalletMaster,
} from "../Pages/Master";
import SubProductForm from "../Components/Organisms/SubProductForm";
import VendorForm from "../Components/Organisms/VendorForm";
import OperatorForm from "../Components/Organisms/OperatorForm";
import ProductForm from "../Components/Organisms/ProductForm";
import SubOperatorForm from "../Components/Organisms/SubOperatorForm";
import BankMasterForm from "../Components/Organisms/BankMasterForm";
import PendingUser from "../Pages/Management/PendingUser";
import ActivationUser from "../Pages/Management/ActivationUser";
import DropdownMasterForm from "../Components/Organisms/DropdownMasterForm";
import {
  AccountSummaryReport,
  APIPerformanceReport,
  CreateOrderReport,
  CumulativeReport,
  DownloadReport,
  EmailReport,
  GstTdsReport,
  InvoiceReport,
  LedgerReport,
  LiveTransactionReport,
  PendingTransactionReport,
  ReconciliationReport,
  RefundReport,
  SearchTransactionReport,
  SmsReport,
  TransactionReport,
  UnsettledTransactionReport,
  UpdateTransactionReport,
} from "../Pages/Reports";

// Lazy loaded pages
const HomePage = lazy(() => import("../Pages/Dashboard/HomePage"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading..</div>}>
      <Routes>
        {/* Auth Routes with AuthLayout */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/otp-verify" element={<OtpVerify />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/set-password" element={<SetPassword />} />
        </Route>

        {/* protected Routes with MainLayout */}
        <Route element={<ProtectedRoutes />}>
          {/* check if User has token? if yes ? render MainLayout : loginPage */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            {/* Masters */}
            <Route path="/master/product" element={<ProductMaster />} />
            <Route
              path="/master/product/add"
              element={<ProductForm mode="add" />}
            />
            <Route
              path="/master/product/edit/:id"
              element={<ProductForm mode="edit" />}
            />
            <Route path="/master/sub-product" element={<SubProductMaster />} />
            <Route
              path="/master/sub-product/add"
              element={<SubProductForm mode="add" />}
            />
            <Route
              path="/master/sub-product/edit/:id"
              element={<SubProductForm mode="edit" />}
            />
            <Route path="/master/operator" element={<OperatorMaster />} />
            <Route
              path="/master/operator/add"
              element={<OperatorForm mode="add" />}
            />
            <Route
              path="/master/operator/edit/:id"
              element={<OperatorForm mode="edit" />}
            />
            <Route
              path="/master/sub-operator"
              element={<SubOperatorMaster />}
            />
            <Route
              path="/master/sub-operator/add"
              element={<SubOperatorForm mode="add" />}
            />
            <Route
              path="/master/sub-operator/edit/:id"
              element={<SubOperatorForm mode="edit" />}
            />

            <Route path="/master/vendor" element={<VendorMaster />} />
            <Route
              path="/master/vendor/add"
              element={<VendorForm mode="add" />}
            />
            <Route
              path="/master/vendor/edit/:id"
              element={<VendorForm mode="edit" />}
            />
            <Route path="/master/bank" element={<BankMaster />} />
            <Route
              path="/master/bank/add"
              element={<BankMasterForm mode="add" />}
            />
            <Route
              path="/master/bank/edit/:id"
              element={<BankMasterForm mode="edit" />}
            />
            <Route path="/master/dropdown" element={<DropdownMaster />} />
            <Route
              path="/master/dropdown/add"
              element={<DropdownMasterForm mode="add" />}
            />
            <Route
              path="/master/dropdown/edit"
              element={<DropdownMasterForm mode="edit" />}
            />
            <Route path="/master/country" element={<CountryMaster />} />
            <Route
              path="/master/user-configuration"
              element={<UserConfigurationMaster />}
            />
            <Route
              path="/master/system-configuration"
              element={<SystemConfigurationMaster />}
            />
            <Route path="/master/wallet" element={<WalletMaster />} />
            <Route path="/master/tax" element={<TaxMaster />} />
            <Route path="/master/api" element={<ApiMaster />} />
            <Route
              path="/master/service"
              element={<ServiceConfigurationMaster />}
            />
            <Route path="/master/ticket" element={<TicketMaster />} />
            <Route path="/master/profile" element={<ProfileMaster />} />
            <Route path="/master/kyc" element={<KycMaster />} />
            <Route path="/master/business" element={<BusinessMaster />} />
            <Route
              path="/master/registration"
              element={<RegistrationMaster />}
            />
            <Route path="/master/payment" element={<PaymentMaster />} />

            {/* Funding */}
            <Route
              path="/funding/pre-funding-authorization"
              element={<PreFundingAuth />}
            />
            <Route
              path="/prefunding/add"
              element={<PrefundingForm mode="add" />}
            />
            <Route
              path="/prefunding/edit/:id"
              element={<PrefundingForm mode="edit" />}
            />

            <Route
              path="/management/user-creation"
              element={<UserCreation />}
            />
            <Route
              path="/management/user/create/:type"
              element={<UserFormPage />}
            />
            <Route path="/management/user/pending" element={<PendingUser />} />
            <Route
              path="/management/user/activation"
              element={<ActivationUser />}
            />
            <Route path="/schemes/schemeslist" element={<SchemesList />} />

            <Route
              path="/schemes/setting/:schemeId"
              element={<SchemeSettingsPage />}
            />
            {/* Reports */}
            <Route
              path="/report/live-transaction"
              element={<LiveTransactionReport />}
            />
            <Route path="/report/transaction" element={<TransactionReport />} />
            <Route
              path="/report/unsettled-transaction"
              element={<UnsettledTransactionReport />}
            />
            <Route
              path="/report/ledger-transaction"
              element={<LedgerReport />}
            />
            <Route
              path="/report/pending-transaction"
              element={<PendingTransactionReport />}
            />
            <Route
              path="/report/update-transaction"
              element={<UpdateTransactionReport />}
            />
            <Route
              path="/report/search-transaction"
              element={<SearchTransactionReport />}
            />
            <Route
              path="/report/api-performance"
              element={<APIPerformanceReport />}
            />
            <Route
              path="/report/account-summary"
              element={<AccountSummaryReport />}
            />
            <Route
              path="/report/create-order"
              element={<CreateOrderReport />}
            />
            <Route path="/report/cumulative" element={<CumulativeReport />} />
            <Route path="/report/download" element={<DownloadReport />} />

            <Route path="/report/email" element={<EmailReport />} />
            <Route path="/report/gst-tds" element={<GstTdsReport />} />
            <Route path="/report/refund" element={<RefundReport />} />
            <Route
              path="/report/reconciliation"
              element={<ReconciliationReport />}
            />
            <Route path="/report/sms" element={<SmsReport />} />

            <Route path="/report/invoice" element={<InvoiceReport />} />
          </Route>
        </Route>

        {/* Redirect all unknown routes */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
