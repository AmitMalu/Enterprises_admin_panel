import React from "react";
import TextComponent from "../../Components/Atoms/TextComponent";
import CreateUserTypeSelector from "../../Components/Organisms/CreateUserTypeSelector";

const UserCreation: React.FC = () => {
  return (
    <div className="w-full flex flex-col p-2">
      {/* Heading */}
      <TextComponent fontFamily="Inter" fontWeight={600} fontSize={24}>
        Network Creation
      </TextComponent>
      <p className="mt-1 text-sm text-slate-500">Choose the level you want to add to your network.</p>

      {/* Network levels */}
      <CreateUserTypeSelector />
    </div>
  );
};

export default UserCreation;
