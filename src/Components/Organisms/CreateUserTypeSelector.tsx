import { useNavigate } from "react-router-dom";
import UserTypeCard from "../Molecules/UserTypeCard";
import { userTypeSelectorOptions } from "../../Config/UserCreationConfig/UserConfig";
import { IMLogoWhiteBGSvg } from "../../assets/Icons";

const radius = 190;

const CreateUserTypeSelector = () => {
  const navigate = useNavigate();

  const handleUserTypeClick = (type: string) => {
    navigate(`/management/user/create/${type}`);
  };
  
  return (
    <div className="flex-1 flex items-center justify-center relative cursor-pointer">
      {/* Center Logo */}
      <div className="w-fit h-fit p-8 pl-10 border-[14px] border-border-ring bg-white rounded-full p-2 z-10 ">
        <IMLogoWhiteBGSvg />
      </div>

      {/* User Types */}
      {userTypeSelectorOptions.map((type, index) => {
        const angle = (360 / userTypeSelectorOptions.length) * index;
        const x = radius * Math.cos((angle * Math.PI) / 180);
        const y = radius * Math.sin((angle * Math.PI) / 180);

        return (
          <div
            key={type.label}
            className="absolute w-[110px] h-[110px]"
            style={{ transform: `translate(${x}px , ${y}px)` }}
            onClick={() => handleUserTypeClick(type.type)}
          >
            <UserTypeCard label={type.label} icon={type.icon} />
          </div>
        );
      })}
    </div>
  );
};

export default CreateUserTypeSelector;
