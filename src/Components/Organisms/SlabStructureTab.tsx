import {
  getFilteredSlabHeaders,
  SlabStructureTableType,
} from "../../Config/Schemes/SchemesConfig";
import GenericMasterTable from "./GenericMasterTable";
import TextComponent from "../Atoms/TextComponent";
import CenteredMessage from "../Molecules/CenteredMessage";
import ShimmerTableRows from "../Atoms/ShimmerTableRows";
import { Skeleton } from "@mantine/core";

const SlabStructureTab = ({ data, loading }: { data: any; loading: boolean }) => {

  if (loading) {
    return (
      <>
        {[1, 2, 3].map((_, index) => (
          <div key={index} className="flex flex-col mt-2">
            <Skeleton height={30} width="40%" />
            <ShimmerTableRows mt={2} rowCount={3} columnCount={8} />
          </div>
        ))}
      </>
    );
  }

  if (!data?.operators?.length) {
    return <CenteredMessage message="No operator data available." />;
  }

  return (
    <>
      {data?.operators?.map((operator: any) => {
        const headers = getFilteredSlabHeaders(operator.slabs);

        return (
          <div key={operator?.operatorCode} className="mb-6">
            {/* Operator Heading */}
            <TextComponent
              color="#1D1F2C"
              fontFamily="Inter"
              fontWeight={500}
              fontSize={18}
            >
              {operator.operatorName}
            </TextComponent>

            {/* Operator Table */}
            {operator.slabs?.length > 0 ? (
              <GenericMasterTable<SlabStructureTableType>
                data={operator.slabs}
                headers={headers}
                mt={2}
              />
            ) : (
              <CenteredMessage message="No slabs defined for this operator." />
            )}
          </div>
        )
      })}
    </>
  );
};

export default SlabStructureTab;
