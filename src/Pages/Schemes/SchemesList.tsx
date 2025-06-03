import React, { useState } from "react";
import TextComponent from "../../Components/Atoms/TextComponent";
import BreadCrumb from "../../Components/Molecules/BreadCrumb";
import ButtonComponent from "../../Components/Atoms/ButtonComponent";
import { AddIconSvg } from "../../assets/Icons";
import { data, headers } from "../../Config/Schemes/SchemesListConfig";
import SchemeListToolbar from "../../Components/Organisms/SchemeListToolbar";
import SchemeListTable from "../../Components/Organisms/SchemeListTable";

const SchemesList = () => {
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  const pageSize = 5;

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  return (
    <div className="w-full min-h-[calc(100vh-90px)] flex flex-col p-2">
      {/* Header Section */}
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

      <SchemeListToolbar
        handleSearchChange={handleSearchChange}
        searchValue={searchValue}
      />

      <SchemeListTable
        headers={headers}
        data={data}
        page={page}
        pageSize={pageSize}
        setPage={setPage}
      />
    </div>
  );
};

export default SchemesList;
