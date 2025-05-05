import React from "react";
import clsx from "clsx";

interface CommonButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

const CommonButton: React.FC<CommonButtonProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      className={clsx(
        "bg-[#DB2729] py-2.5 w-full text-white font-open rounded-xl text-sm xl:text-lg 2xl:text-xl text-center font-normal",
        className
      )}
    >
      {children}
    </button>
  );
};

export default CommonButton;
