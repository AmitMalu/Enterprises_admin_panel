import React from "react";
import TextComponent from "../../Components/Atoms/TextComponent";
import BreadCrumb from "../../Components/Molecules/BreadCrumb";
import ButtonComponent from "../../Components/Atoms/ButtonComponent";
import {
  AddIconSvg,
  ExportIcon,
  FilterIcon2,
  SearchIcon,
  SelectDateIcon,
} from "../../assets/Icons";
import TextInputComponent from "../../Components/Atoms/TextInputComponent";

const SchemesList = () => {
  const handleSearchChange = () => {};

  return (
    <div className="w-full min-h-[calc(100vh-90px)] flex flex-col p-2">
      <div className="flex justify-between">
        <div>
          {/* Heading */}
          <TextComponent
            color="#1D1F2C"
            fontFamily="Inter"
            fontWeight={600}
            fontSize={22}
          >
            Manager UI
          </TextComponent>

          {/* Sub Heading */}
          <div className="mt-2">
            <BreadCrumb type="Schemes List" text="Schemes" color="#12B5F1" />
          </div>
        </div>

        <div className="flex items-end">
          <ButtonComponent
            style={{ padding: "5px 14px", height: 40 }}
            radius={8}
            font="Inter"
            textColor="#fff"
            bgColor="#12B5F1"
            borderColor="#FFFFFF"
            fontSize="14"
            leftIcon={<AddIconSvg />}
          >
            Create New Scheme
          </ButtonComponent>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <div className="border border-[#E0E2E7] rounded-md">
          <ButtonComponent
            style={{
              padding: "5px 14px",
              height: 40,
            }}
            radius={6}
            font="Inter"
            textColor="#000000"
            bgColor="#E6EAED"
            fontSize="14"
            fw="600"
          >
            Scheme List
          </ButtonComponent>
        </div>

        <div className="flex gap-2 items-end">
          <TextInputComponent
            className="mb-1"
            name="search"
            placeholder="Search"
            value=""
            size="sm"
            onChange={handleSearchChange}
            leftSection={<SearchIcon />}
          />

          <ButtonComponent
            style={{
              padding: "5px 14px",
              height: 40,
            }}
            radius={8}
            font="Inter"
            textColor="#667085"
            borderColor="#E0E2E7"
            bgColor="#fff"
            fontSize="14"
            fw="600"
            leftIcon={<SelectDateIcon />}
          >
            Select Date
          </ButtonComponent>

          <ButtonComponent
            style={{
              padding: "5px 14px",
              height: 40,
            }}
            radius={8}
            font="Inter"
            textColor="#667085"
            borderColor="#E0E2E7"
            bgColor="#fff"
            fontSize="14"
            fw="600"
            leftIcon={<FilterIcon2 />}
          >
            Filter
          </ButtonComponent>

          <ButtonComponent
            style={{
              padding: "5px 14px",
              height: 40,
            }}
            radius={8}
            font="Inter"
            textColor="#667085"
            borderColor="#E0E2E7"
            bgColor="#fff"
            fontSize="14"
            fw="600"
            leftIcon={<ExportIcon width={18} height={18} />}
          >
            Export
          </ButtonComponent>
        </div>
      </div>
    </div>
  );
};

export default SchemesList;
