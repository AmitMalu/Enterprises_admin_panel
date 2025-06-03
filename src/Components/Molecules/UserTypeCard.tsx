import React from "react";
import TextComponent from "../Atoms/TextComponent";

interface UserTypeCardProps {
  label: string;
  icon: React.ReactNode;
}

const UserTypeCard: React.FC<UserTypeCardProps> = ({ label, icon }) => {
  return (
    <div className="w-full h-full bg-white flex flex-col items-center text-center rounded-full border-[14px] border-[#F0F3FF] p-2.5">
      <div className="flex items-center justify-center">{icon}</div>
      <TextComponent
        fontFamily="inter"
        fontWeight={600}
        fontSize={10}
        className="w-[60px] leading-tight"
        color="#3D3D3D"
      >
        {label}
      </TextComponent>
    </div>
  );
};

export default UserTypeCard;
