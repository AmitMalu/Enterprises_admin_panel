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
        "bg-[#DB2729] py-2.5 w-full text-white font-open rounded-xl text-sm xl:text-lg 2xl:text-xl 3xl:text-2xl text-center font-normal",
        className
      )}
    >
      <span className="font-open text-sm xl:text-lg 2xl:text-xl 3xl:text-2xl font-semibold text-white">
        {children}
      </span>
    </button>
  );
};

export default CommonButton;
