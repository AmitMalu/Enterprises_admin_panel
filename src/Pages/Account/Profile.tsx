import { useEffect, useState } from "react";
import BackHeader from "../../Components/Molecules/BackHeader";
import { IconUserCheck } from "@tabler/icons-react";
import { CustomTab } from "../../Components/Molecules/CustomTab";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { fetchProfileInfo } from "../../Redux/Features/Auth/Thunk";
import ProfilePersonalInfo from "../../Components/Organisms/ProfilePersonalInfo";
import ProfileOutletInfo from "../../Components/Organisms/ProfileOutletInfo";
import ProfileBankInfo from "../../Components/Organisms/ProfileBankInfo";
import ProfileAddressInfo from "../../Components/Organisms/ProfileAddressInfo";
import ProfileKycDocuments from "../../Components/Organisms/ProfileKycDocuments";
import { toast } from "react-toastify";
import { colors } from "../../theme/colors";

const Profile = () => {
  const profileData = useAppSelector((state) => state.auth.profileInfo); // Assuming you store it in auth slice
  const { info, address, outletAddress, myBanks, kycDocs } = profileData || {};
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState("personal");

  const tabList = [
    { value: "personal", label: "Personal Info", leftSection: <IconUserCheck size={18} /> },
    // { value: "address", label: "Address", leftSection: <IconBuilding size={18} /> },
    // { value: "outlet", label: "Outlet Address", leftSection: <IconBuilding size={18} /> },
    // { value: "bank", label: "Bank Details", leftSection: <IconCashBanknote size={18} /> },
    // { value: "kyc", label: "KYC Docs", leftSection: <IconFile size={18} /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "personal":
        return <ProfilePersonalInfo info={info} />;
      case "address":
        return <ProfileAddressInfo address={address} />;
      case "outlet":
        return <ProfileOutletInfo outletAddress={outletAddress} />;
      case "bank":
        return <ProfileBankInfo myBanks={myBanks} />;
      case "kyc":
        return <ProfileKycDocuments kycDocs={kycDocs} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("userInfo") || "{}")?.hierarchyId || ""
    if (id) {
      dispatch(fetchProfileInfo(id)).unwrap()
        .catch((err) => {
          toast.error(err);
          console.error("Error fetching profile info:", err);
        });
    }
  }, [])

  return (
    <div className="p-4 w-full h-[calc(100vh-90px)] flex flex-col">
      <BackHeader
        title={`My Profile`}
        backPath="/"
      />

      <CustomTab
        className="mt-4"
        tabList={tabList}
        value={activeTab}
        onChange={(val) => {
          if (val !== null) {
            setActiveTab(val);
          }
        }}
        grow={false}
        borderColor={colors.border.strong}
        activeBg={colors.text.inverse}
        activeColor={colors.brand.highlight}
      />

      <div className="flex-1 overflow-auto scrollbar-hide mt-4 py-2 xl:py-4 px-4 bg-white rounded-2xl" >
        {renderContent()}
      </div>
    </div>
  )
}

export default Profile;
