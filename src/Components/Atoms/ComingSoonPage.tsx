import React from "react";
import TextComponent from "./TextComponent";

const ComingSoonPage = ({ name }: { name?: string }) => {
  return (
    <div className="p-2 w-full h-[calc(100vh-90px)] flex items-center justify-center bg-[#F9F9F9]">
      <div className="text-center">
        <TextComponent
          color="#BF0204"
          fontWeight={700}
          fontSize={36}
          fontFamily="Inter"
          className={name ? "" : "tracking-wide animate-pulse"}
        >
          {name ? name : "COMING SOON!"}
        </TextComponent>
        {name && (
          <p className="text-red-500 text-lg mt-2 font-medium tracking-wide animate-bounce">
            COMING SOON!
          </p>
        )}
      </div>
    </div>
  );
};

export default ComingSoonPage;
