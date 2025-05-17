import React from "react";
import TextComponent from "../../Components/Atoms/TextComponent";
import {
  DistributorLogoSvg,
  EnterpriseLogoSvg,
  IMAdminLogoSvg,
  IMLogoWhiteBGSvg,
  PartnerLogoSvg,
  RetailerLogoSvg,
  SuperDistributorLogoSvg,
  WhiteLabelLogoSvg,
} from "../../assets/Icons";

const userTypes = [
  { label: "IM Admin", icon: <IMAdminLogoSvg /> },
  { label: "Enterprise", icon: <EnterpriseLogoSvg /> },
  { label: "Retailer", icon: <RetailerLogoSvg /> },
  { label: "Super Distributor", icon: <SuperDistributorLogoSvg /> },
  { label: "Partner", icon: <PartnerLogoSvg /> },
  { label: "White Label", icon: <WhiteLabelLogoSvg /> },
  { label: "Distributor", icon: <DistributorLogoSvg /> },
];

const radius = 190;

const UserCreation: React.FC = () => {
  return (
    <div className="w-full min-h-[calc(100vh-90px)] flex flex-col p-2">
      {/* Heading */}
      <TextComponent fontFamily="Inter" fontWeight={600} fontSize={24}>
        User Creation
      </TextComponent>

      {/* Logo and Blades */} 
      <div className="flex-1 flex items-center justify-center relative cursor-pointer">
        {/* Center Logo */}
        <div className="w-fit h-fit p-8 pl-10 border-[14px] border-[#F0F3FF] bg-white rounded-full p-2 z-10 border border-black">
          <IMLogoWhiteBGSvg />
        </div>

        {/* Blades */}
        {userTypes.map((type, index) => {
          const angle = (360 / userTypes.length) * index;
          const x = radius * Math.cos((angle * Math.PI) / 180);
          const y = radius * Math.sin((angle * Math.PI) / 180);

          return (
            <div
              key={type.label}
              className="absolute w-[110px] h-[110px]"
              style={{ transform: `translate(${x}px , ${y}px)` }}
            >
              <div className="w-full h-full bg-white flex flex-col items-center text-center rounded-full border-[14px] border-[#F0F3FF] p-2.5">
                <div className="flex items-center justify-center">
                  {type.icon}
                </div>
                <TextComponent
                  fontFamily="inter"
                  fontWeight={600}
                  fontSize={10}
                  className="w-[60px] leading-tight"
                  color="#3D3D3D"
                >
                  {type.label}
                </TextComponent>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserCreation;
