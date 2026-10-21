import React from "react";
import TextComponent from "../../Components/Atoms/TextComponent";
import CreateUserTypeSelector from "../../Components/Organisms/CreateUserTypeSelector";

const UserCreation: React.FC = () => {
  return (
    <div className="w-full min-h-[calc(100vh-90px)] flex flex-col p-2">
      {/* Heading */}
      <TextComponent fontFamily="Inter" fontWeight={600} fontSize={24}>
        Onboard Partner
      </TextComponent>

      {/* Logo and Blades */}
      <CreateUserTypeSelector />
    </div>
  );
};

export default UserCreation;
