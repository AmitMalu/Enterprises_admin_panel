import React from "react";
import orgLogo from '../../assets/Images/orgLogo.png';
import { Tooltip } from "@mantine/core";
import { BUILD_INFO } from "../../buildInfo";

interface LeftSideLayoutProps {
  bgImage: string;
  children?: React.ReactNode;
  oneLiner?: string;
}

const LeftSideLayout: React.FC<LeftSideLayoutProps> = ({
  bgImage,
  children,
  oneLiner,
}) => {

  return (
    <div className="hidden lg:block lg:w-[55%] h-full relative">
      {/* Background Image */}
      <img
        src={bgImage}
        alt="Background"
        className="w-[80%] h-full m-auto  object-contain"
      />

      {/* One-liner Text */}
      {oneLiner && (
        <div className="absolute bottom-8 left-0 right-0 text-center">
          <p className="text-brand-accent text-sm font-geologica font-medium drop-shadow-lg">
            {oneLiner.split(".")[0]}.
            <span className="text-brand-primary">
              {oneLiner.split(".")[1]}
            </span>
          </p>
        </div>
      )}

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

