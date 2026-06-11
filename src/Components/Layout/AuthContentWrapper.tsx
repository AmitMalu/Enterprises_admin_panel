import React from "react";
import AuthLeftImagePanel from "../Organisms/AuthLeftImagePanel";
import StepperLines from "../Atoms/StepperLines";
import { useLocation } from "react-router-dom";
import { authLayoutRouteConfig } from "../../Config/Auth/AuthImagePanelConfig";

interface AuthContentWrapperProps {
  children: React.ReactNode
}

const AuthContentWrapper: React.FC<AuthContentWrapperProps> = ({ children }) => {

  const { pathname } = useLocation()
  const { step = 1, bg = "", oneLiner = "", rightBg = "" } = authLayoutRouteConfig[pathname] || {}

  return (
    <>
      {/* Left Side - only visible on large screens  */}
      <AuthLeftImagePanel bgImage={bg} oneLiner={oneLiner}>
      </AuthLeftImagePanel>

      <div className="w-full lg:w-[45%] h-full flex flex-col items-center justify-center overflow-auto relative">
        {/* Background Image for Right Side */}
        {rightBg && (
          <img
            src={rightBg}
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
        )}
        
        {/* Content Card */}
        <div className="relative z-10 w-full max-w-md mx-auto">
          {children}
        </div>
        
        {/* Stepper Lines Below Card */}
        <div className="relative z-10 mt-4">
          <StepperLines activeStep={step} totalSteps={4} />
        </div>
      </div>
    </>
  );

};



export default AuthContentWrapper;

