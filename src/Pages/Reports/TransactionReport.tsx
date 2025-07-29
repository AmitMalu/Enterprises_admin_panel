import { DatesRangeValue } from "@mantine/dates";
import TextComponent from "../../Components/Atoms/TextComponent";
import { useState } from "react";
import CustomDateRangePicker from "../../Components/Atoms/CustomDateRangePicker";
import { useSubProductList } from "../../Utils/hooks/useSubProductList";
import { useHierarchySubHierarchy } from "../../Utils/hooks/useHierarchySubHierarchy";
import SelectComponent from "../../Components/Atoms/SelectComponent";

const TransactionReport = () => {
  const [selectedRange, setSelectedRange] = useState<DatesRangeValue>([null, null]);
  const [selectedSubProduct, setSelectedSubProduct] = useState<string | null>("")
  const [selectedHierarchy, setSelectedHierarchy] = useState<string | null>("")
  const [selectedSubHierarchy, setSelectedSubHierarchy] = useState<string | null>("")
  const [selectedWalletType, setSelectedWalletType] = useState<string | null>("")
  const [selectedStatus, setSelectedStatus] = useState<string | null>("ALL")

  const { subProductDropdownData, loadingSubProductList } = useSubProductList()
  const { hierarchyList, loadingHierarchyList, subHierarchyList, loadingSubHierarchyList, subHierarchyKey } = useHierarchySubHierarchy({
    selectedHierarchyCode: selectedHierarchy
  })

  console.log(subProductDropdownData, "subpro");
  console.log(hierarchyList, "heirarchy");
console.log(selectedHierarchy);


  return (
    <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col">
      <TextComponent fontSize={22} fontFamily="Inter" fontWeight={600}>
        Transaction Report
      </TextComponent>

      <CustomDateRangePicker
        value={selectedRange}
        onChange={(val) => setSelectedRange(val)}
        minDate={new Date(2024, 0, 1)}
        maxDate={new Date(2025, 11, 31)}
        allowSingleDateInRange={false}
        shortcuts
      />

      <SelectComponent
        name="subproduct"
        data={subProductDropdownData}
        disabled={loadingSubProductList}
        value={selectedSubProduct}
        onChange={() => setSelectedSubProduct}
      />

      <SelectComponent
        name="hierarchy"
        data={hierarchyList}
        disabled={loadingHierarchyList}
        value={selectedHierarchy}
        onChange={(val) => setSelectedHierarchy(val)}
      />

      <SelectComponent
        name="subHierarchy"
        data={subHierarchyList}
        disabled={loadingSubHierarchyList}
        value={selectedSubHierarchy}
        onChange={() => setSelectedSubHierarchy}
      />

      <SelectComponent
        name="walletType"
        data={[
          { label: "PREPAID", value: "PREPAID" },
          { label: "POSTPAID", value: "POSTPAID" },
        ]}
        value={selectedWalletType}
        onChange={() => setSelectedWalletType}
      />

      <SelectComponent
        name="status"
        data={[
          { label: "ALL", value: "ALL" },
          { label: "FAILED", value: "FAILED" },
          { label: "SUCCESS", value: "SUCCESS" },
          { label: "PENDING", value: "PENDING" },
        ]}
        value={selectedStatus}
        onChange={() => setSelectedStatus}
      />


    </div>
  );
};

export default TransactionReport;
