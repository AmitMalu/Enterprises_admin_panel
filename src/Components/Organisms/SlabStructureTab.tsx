import {
  getFilteredSlabHeaders,
  SlabStructureTableType,
} from "../../Config/Schemes/SchemesConfig";
import GenericMasterTable from "./GenericMasterTable";
import TextComponent from "../Atoms/TextComponent";
import CenteredMessage from "../Molecules/CenteredMessage";
import ShimmerTableRows from "../Atoms/ShimmerTableRows";
import { Skeleton, Table } from "@mantine/core";
import { DeleteIcon } from "../../assets/Icons";
import { colors } from "../../theme/colors";

interface SlabStructureTabProps {
  data: any[];
  loading: boolean;
  onDataChange?: (
    operatorCode: string,
    slabId: number | string,
    key: keyof SlabStructureTableType,
    value: any,
  ) => void;
  isSchemeActive?: boolean;
  showAddRow?: boolean;
  onAddRow?: (operatorCode: string) => void;
  handleRemoveRow: (operatorCode: string, id: string | number) => void;
  tdsRate?: number | string;
}

const SlabStructureTab = ({ data, loading, onDataChange, showAddRow, onAddRow, handleRemoveRow, isSchemeActive, tdsRate }: SlabStructureTabProps) => {

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

  if (!data?.length) {
    return <CenteredMessage message="No operator data available." />;
  }

  return (
    <>
      {data?.map((operator) => {
        const headers = getFilteredSlabHeaders(operator.slabs);

        return (
          <div key={operator?.operatorCode} className="mb-6">
            {/* Operator Heading */}
            <TextComponent
              color={colors.text.heading}
              fontFamily="Inter"
              fontWeight={600}
              fontSize={18}
            >
              {String(operator.operatorName).toUpperCase()}
            </TextComponent>

            {/* Operator Table */}
            {operator.slabs?.length > 0 ? (
              <GenericMasterTable<SlabStructureTableType>
                data={operator?.slabs}
                headers={headers}
                tdsRate={tdsRate}
                editable={!!isSchemeActive}
                onDataChange={(rowIndex, key, value) =>
                  onDataChange?.(
                    operator.operatorCode,
                    operator.slabs[rowIndex].id,
                    key,
                    value
                  )
                }
                showAddRow={showAddRow}
                onAddRow={() => onAddRow?.(operator.operatorCode)}
                renderExtraHeader={() => <Table.Th></Table.Th>}
                renderExtraRowCell={(item) =>
                  typeof item.id === "string" && item.id.startsWith("new-") ? (
                    <span
                      onClick={() => handleRemoveRow(operator.operatorCode, String(item.id))}
                      className="cursor-pointer flex items-center justify-center"
                      title="Remove Slab"
                    >
                      <DeleteIcon />
                    </span>
                  ) : (
                    <></>
                  )
                }
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
