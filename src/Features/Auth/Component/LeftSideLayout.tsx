import React from "react";

interface LeftSideLayoutProps {
  bgImage: string;
  orgLogo: string;
  children?: React.ReactNode;
}

const LeftSideLayout: React.FC<LeftSideLayoutProps> = ({
  bgImage,
  orgLogo,
  children,
}) => {
  return (
    <div className="hidden lg:block lg:w-[65%] h-full relative bg-[#F2ECEC]">
      {/* Background Image */}
      <img
        src={bgImage}
        alt="Background"
        className="w-full h-full object-contain"
      />

      {/* Logo */}
      <div className="absolute top-0 left-6">
        <img
          src={orgLogo}
          alt="Logo"
          className="w-24 md:w-32 max-w-none"
        />
      </div>

      {children}

    </div>
  );
};

export default LeftSideLayout;
