import React, { useState } from "react";
import bgImage from "../../assets/AuthImages/loginPageBg.png";
import orgLogo from "../../assets/AuthImages/orgLogo.png";
import { UsernameInput } from "../../Components/UsernameInput";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");

  const handleLogin = () => {
    console.log("Logging in with:", username);
  };

  return (
    <div className="w-screen h-screen flex bg-white ">
      {/* Left Side */}
      <div className="w-[70%] h-full relative overflow-hidden bg-[#F2ECEC]">
        <img
          src={bgImage}
          alt="Background"
          className="w-full h-full object-cover"
        />
        {/* Logo */}
        <div className="absolute top-0 left-6">
          <img
            src={orgLogo}
            alt="Instant Mudra Logo"
            className="w-24 md:w-32 max-w-none"
          />
        </div>

        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex flex-col items-center gap-[5px]">
          <div className="w-[6px] h-[12vh] bg-[#FF4D4D] rounded-full"></div>
          <div className="w-[6px] h-[4vh] bg-[#FF4D4D] rounded-full"></div>
          <div className="w-[6px] h-[4vh] bg-[#FF4D4D] rounded-full"></div>
          <div className="w-[6px] h-[4vh] bg-[#FF4D4D] rounded-full"></div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-[30%] h-full flex items-center justify-center">
        <div className="w-full px-10 flex flex-col text-left">
          {/* Welcome Text */}
          <p className="text-gray-500 text-lg xl:text-xl 2xl:text-2xl mb-1">
            Welcome Back
          </p>
          <h2 className="text-xl xl:text-2xl 2xl:text-4xl font-bold text-gray-700 mb-6">
            Login to Your Account
          </h2>

          {/* Username */}
          <UsernameInput
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
