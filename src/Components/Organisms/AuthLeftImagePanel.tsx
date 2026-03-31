import React from "react";
import orgLogo from '../../assets/Images/orgLogo.png';
import { Tooltip } from "@mantine/core";
import { BUILD_INFO } from "../../buildInfo";

interface LeftSideLayoutProps {
  bgImage: string;
  children?: React.ReactNode;
}

const LeftSideLayout: React.FC<LeftSideLayoutProps> = ({
  bgImage,
  children,
}) => {
  return (
    <div className="hidden lg:block lg:w-[65%] h-full relative bg-surface-auth">
      {/* Background Image */}
      <img
        src={bgImage}
        alt="Background"
        className="w-full h-full object-contain"
      />

      {/* Logo */}
      <div className="absolute top-0 left-6">
        <Tooltip label={`${BUILD_INFO.version} (${BUILD_INFO.builtAt})`}
          withArrow={false}
          position="right"
          openDelay={1000}
          styles={{
            tooltip: {
              backgroundColor: 'transparent',
              color: 'black',
              fontSize: '12px',
            }
          }}
        >
          <img
            src={orgLogo}
            alt="Logo"
            className="w-24 md:w-40 max-w-none"
          />
        </Tooltip>
      </div>
      {children}
    </div>
  );
};

export default LeftSideLayout;
