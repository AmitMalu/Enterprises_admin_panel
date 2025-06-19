import TextComponent from "../../Components/Atoms/TextComponent";
import { useNavigate } from "react-router-dom";
import { data, headers } from "../../Config/Funding/fundingConfig";
import PreFundingTable from "../../Components/Organisms/PreFundingTable";
import PreFundingToolbar from "../../Components/Organisms/PreFundingToolbar";
import { useState } from "react";

const PreFundingAuth = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const handleEdit = (item: any) => {
    navigate(`/prefunding/edit/${item.transactionId}`, { state: item });
  };

  return (
    <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col">
      {/* Heading */}
      <TextComponent fontSize={22} fontFamily="Manrope" fontWeight={500}>
        Prefunding Request
      </TextComponent>

      {/* Toolbar */}
      <PreFundingToolbar
        handleSearchChange={handleSearchChange}
        searchValue={searchValue}
      />

      {/* PreFunding Table */}
      <PreFundingTable data={data} headers={headers} onEdit={handleEdit} />
    </div>
  );
};

export default PreFundingAuth;
