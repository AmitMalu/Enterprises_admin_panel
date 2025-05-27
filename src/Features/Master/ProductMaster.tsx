import React from "react";
import TextComponent from "../../Components/Atoms/TextComponent";
import ButtonComponent from "../../Components/Atoms/ButtonComponent";
import { AddIconSvg } from "../../assets/Icons";
import ProductMasterTable from "../../Components/Atoms/ProductMasterTable";

const ProductMaster = () => {
  return (
    <div className="p-2 w-full h-[calc(100vh-90px)]">
      <TextComponent fontSize={22} fontFamily="Manrope" fontWeight={500}>
        Product Master
      </TextComponent>

      <ButtonComponent
        style={{ padding: "5px 30px", height: 40, marginTop: 20 }}
        radius={1}
        textColor="#fff"
        bgColor="#BF0204"
        leftIcon={<AddIconSvg />}
      >
        <TextComponent fontSize={18} fontFamily="Manrope" fontWeight={500}>
          Add product
        </TextComponent>

      </ButtonComponent>
    </div>
  );
};

export default ProductMaster;
