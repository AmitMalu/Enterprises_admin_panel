import {
  ExportIcon,
  FilterIcon2,
  SearchIcon,
  SelectDateIcon,
} from "../../assets/Icons";
import ButtonComponent from "../Atoms/ButtonComponent";
import TextInputComponent from "../Atoms/TextInputComponent";

const SchemeListToolbar = ({
  handleSearchChange,
  searchValue = "",
}: {
  handleSearchChange?: (value: string) => void;
  searchValue?: string;
}) => {
  return (
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
          value={searchValue}
          size="sm"
          onChange={(e) => handleSearchChange?.(e.target.value)}
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
  );
};

export default SchemeListToolbar;
