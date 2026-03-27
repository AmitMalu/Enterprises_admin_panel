import React from "react";
import TextComponent from "../Atoms/TextComponent";
import { colors } from "../../theme/colors";

interface UserTypeCardProps {
  label: string;
  icon: React.ReactNode;
}

const UserTypeCard: React.FC<UserTypeCardProps> = ({ label, icon }) => {
  return (
    <div className="w-full h-full bg-white flex flex-col items-center text-center rounded-full border-[14px] border-border-ring p-2.5">
      <div className="flex items-center justify-center">{icon}</div>
      <TextComponent
        fontFamily="inter"
        fontWeight={600}
        fontSize={10}
        className="w-[60px] leading-tight"
        color={colors.text.neutral}
      >
        {label}
      </TextComponent>
    </div>
  );
};

export default UserTypeCard;
