import { useNavigate } from "react-router-dom";
import UserTypeCard from "../Molecules/UserTypeCard";
import { userTypeSelectorOptions } from "../../Config/UserCreationConfig/UserConfig";
// import { IMLogoWhiteBGSvg } from "../../assets/Icons";
import orgLogo from '../../assets/Images/orgLogo.png';

const radius = 190;

const CreateUserTypeSelector = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const logoPath = userInfo?.logoPath || "";
  const role = userInfo?.role || userInfo?.hierarchyId?.split("-")[1] || "";
  const isWhiteLabel = role === "WLAD" || role === "WLAU" || role === "WL";
  const logoSrc = isWhiteLabel ? logoPath : orgLogo;

  const handleUserTypeClick = (type: string) => {
    navigate(`/management/user/create/${type}`);
  };

  return (
    <div className="flex-1 flex items-center justify-center relative cursor-pointer">
      {/* Center Logo */}
      {logoSrc && (
        <div className="w-fit h-fit p-4 pl-4 border-[14px] border-border-ring bg-white rounded-full z-10 ">
          {/* <IMLogoWhiteBGSvg /> */}
          <img
            src={logoSrc}
            alt="Logo"
            className="w-24 md:w-40 max-w-none object-contain"
          />
        </div>
      )}

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
