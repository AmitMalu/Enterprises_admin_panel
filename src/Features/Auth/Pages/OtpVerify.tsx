import React from "react";
import LeftSideLayout from "../Component/LeftSideLayout";
import StepperLines from "../Component/StepperLines";
import otpVerifyBgImage from "../../../assets/Images/otpVerifyBg.png";
import orgLogo from "../../../assets/Images/orgLogo.png";

const OtpVerify: React.FC = () => {
  return (
    <div className="w-screen h-screen flex flex-col lg:flex-row bg-white ">
      {/* Left Side - only visible on large screens */}
      <LeftSideLayout bgImage={otpVerifyBgImage} orgLogo={orgLogo}>
        <StepperLines activeStep={2} totalSteps={4} />
      </LeftSideLayout>

      {/* Right Side */}
      <div className="w-full lg:w-[35%] h-full flex items-center justify-center overflow-auto">
        <div className="w-full px-10 flex flex-col text-left">
          <h2 className="mb-8 text-[#4C4C57] font-geologica  text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-medium mb-6">
            Enter OTP
          </h2>

          <div className="mb-4 font-geologica font-normal text-sm 2xl:text-xl cursor-pointer text-[#BF0204]">
            Please Enter Your OTP
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpVerify;
