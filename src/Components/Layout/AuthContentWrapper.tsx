import React from "react";
import AuthLeftImagePanel from "../Organisms/AuthLeftImagePanel";
import StepperLines from "../Atoms/StepperLines";
import { useLocation } from "react-router-dom";
import BrandLogo from "../Brand/BrandLogo";
import { authLayoutRouteConfig } from "../../Config/Auth/AuthImagePanelConfig";

interface AuthContentWrapperProps {
  children: React.ReactNode
}

const AuthContentWrapper: React.FC<AuthContentWrapperProps> = ({ children }) => {

  const { pathname } = useLocation()
  const { step = 1, oneLiner = "" } = authLayoutRouteConfig[pathname] || {}

  return (
    <>
      {/* Left Side - only visible on large screens  */}
      <AuthLeftImagePanel oneLiner={oneLiner}>
      </AuthLeftImagePanel>

      <div className="w-full lg:w-[48%] h-full flex flex-col items-center justify-center overflow-auto relative bg-white px-6">
        {/* Logo for small screens, where the left panel is hidden */}
        <div className="lg:hidden mb-6">
          <BrandLogo subtitle="Admin Console" />
        </div>

        <div className="relative z-10 w-full max-w-[420px] mx-auto">
          {children}
        </div>

        <div className="relative z-10 mt-6">
          <StepperLines activeStep={step} totalSteps={4} />
        </div>
      </div>
    </>
  );

};



export default AuthContentWrapper;

