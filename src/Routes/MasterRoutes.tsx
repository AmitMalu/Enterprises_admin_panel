import { Route } from "react-router-dom";
import {
  BankMaster,
  BusinessMaster,
  CountryMaster,
  KycMaster,
  OperatorMaster,
  PaymentMaster,
  ProductMaster,
  ProfileMaster,
  RegistrationMaster,
  SubOperatorMaster,
  SubProductMaster,
  PincodeMaster,
  TicketMaster,
  UserConfigurationMaster,
  VendorMaster,
  WalletMaster,
  BankMaster,
  MainMaster,
  SubMaster,
  StateMaster,
  DistrictMaster,
  CityMaster,
} from "../Pages/Master";
import SubProductForm from "../Components/Organisms/SubProductForm";
import VendorForm from "../Components/Organisms/VendorForm";
import OperatorForm from "../Components/Organisms/OperatorForm";
import ProductForm from "../Components/Organisms/ProductForm";
import SubOperatorForm from "../Components/Organisms/SubOperatorForm";
import NetworkBankMasterForm from "../Components/Organisms/NetworkBankMasterForm";
import MainMasterForm from "../Components/Organisms/MainMasterForm";
import SubMasterForm from "../Components/Organisms/SubMasterForm";
import BankMasterForm from "../Components/Organisms/BankMasterForm";
import CountryMasterForm from "../Components/Organisms/CountryMasterForm";
import StateMasterForm from "../Components/Organisms/StateMasterForm";
import DistrictMasterForm from "../Components/Organisms/DistrictMasterForm";
import CityMasterForm from "../Components/Organisms/CityMasterForm";
import PincodeMasterForm from "../Components/Organisms/PincodeMasterForm";

export const MasterRoutes = (
  <>
    <Route path="/master/product" element={<ProductMaster />} />
    <Route path="/master/product/add" element={<ProductForm mode="add" />} />
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
    <Route path="/master/operator/add" element={<OperatorForm mode="add" />} />
    <Route
      path="/master/operator/edit/:id"
      element={<OperatorForm mode="edit" />}
    />
    <Route path="/master/sub-operator" element={<SubOperatorMaster />} />
    <Route
      path="/master/sub-operator/add"
      element={<SubOperatorForm mode="add" />}
    />
    <Route
      path="/master/sub-operator/edit/:id"
      element={<SubOperatorForm mode="edit" />}
    />

    <Route path="/master/vendor" element={<VendorMaster />} />
    <Route path="/master/vendor/add" element={<VendorForm mode="add" />} />
    <Route
      path="/master/vendor/edit/:id"
      element={<VendorForm mode="edit" />}
    />
    <Route path="/master/banks" element={<BankMaster />} />
    <Route path="/master/banks/add" element={<BankMasterForm mode="add" />} />
    <Route
      path="/master/banks/edit/:id"
      element={<BankMasterForm mode="edit" />}
    />

    <Route path="/master/bankmaster" element={<BankMaster />} />
    <Route path="/master/bankmaster/add" element={<BankMasterForm mode="add" />} />
    <Route
      path="/master/bankmaster/edit/:id"
      element={<BankMasterForm mode="edit" />}
    />

    <Route path="/master/main" element={<MainMaster />} />
    <Route path="/master/main/add" element={<MainMasterForm mode="add" />} />
    {/* <Route path="/master/main/edit/:id" element={<MainMasterForm mode="edit" />} /> */}

    <Route path="/master/sub-master" element={<SubMaster />} />
    <Route path="/master/sub-master/add" element={<SubMasterForm mode="add" />} />
    {/* <Route path="/master/sub-master/edit/:id" element={<MainMasterForm mode="edit" />} /> */}
    <Route path="/master/country" element={<CountryMaster />} />
    <Route path="/master/country/add" element={<CountryMasterForm mode="add" />} />
    <Route path="/master/country/edit/:id" element={<CountryMasterForm mode="edit" />} />

    <Route path="/master/state" element={<StateMaster />} />
    <Route path="/master/state/add" element={<StateMasterForm mode="add" />} />
    <Route path="/master/state/edit/:id" element={<StateMasterForm mode="edit" />} />

    <Route path="/master/district" element={<DistrictMaster />} />
    <Route path="/master/district/add" element={<DistrictMasterForm mode="add" />} />
    <Route path="/master/district/edit/:id" element={<DistrictMasterForm mode="edit" />} />

    <Route path="/master/city" element={<CityMaster />} />
    <Route path="/master/city/add" element={<CityMasterForm mode="add" />} />
    <Route path="/master/city/edit/:id" element={<CityMasterForm mode="edit" />} />

    <Route path="/master/pincode" element={<PincodeMaster />} />
    <Route path="/master/pincode/add" element={<PincodeMasterForm mode="add" />} />
    <Route path="/master/pincode/edit/:id" element={<PincodeMasterForm mode="edit" />} />

    <Route
      path="/master/user-configuration"
      element={<UserConfigurationMaster />}
    />
    <Route path="/master/wallet" element={<WalletMaster />} />
    <Route path="/master/ticket" element={<TicketMaster />} />
    <Route path="/master/profile" element={<ProfileMaster />} />
    <Route path="/master/kyc" element={<KycMaster />} />
    <Route path="/master/business" element={<BusinessMaster />} />
    <Route path="/master/registration" element={<RegistrationMaster />} />
    <Route path="/master/payment" element={<PaymentMaster />} />
  </>
);
