import React, { Children } from "react";
import LeftSideLayout from "./LeftSideLayout";
import StepperLines from "../../Components/Atoms/StepperLines";
import { useLocation } from "react-router-dom";
import { authLayoutRouteConfig } from "./AuthLayoutConfig";

interface AuthContentWrapperProps {
    children : React.ReactNode
}

const AuthContentWrapper: React.FC<AuthContentWrapperProps> = ({children}) => {

    const {pathname } = useLocation()
    const {step = 1 , bg = ""} = authLayoutRouteConfig[pathname] || {}

    return (
    <>
      {/* Left Side - only visible on large screens  */}
      <LeftSideLayout bgImage={bg}>
        <StepperLines activeStep={step} totalSteps={4} />
      </LeftSideLayout>

      <div className="w-full lg:w-[35%] h-full flex items-center justify-center overflow-auto">
        {children}
      </div>
    </>
  );
};

export default AuthContentWrapper;
