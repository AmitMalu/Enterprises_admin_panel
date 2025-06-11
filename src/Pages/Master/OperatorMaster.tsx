import { useEffect, useState } from "react";
import { EditIcon, EyeIcon } from "../../assets/Icons";
import TextComponent from "../../Components/Atoms/TextComponent";
import { useNavigate } from "react-router-dom";
import GenericMasterTable from "../../Components/Organisms/GenericMasterTable";
import GenericMasterToolbar from "../../Components/Organisms/GenericMasterToolbar";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { fetchOperator } from "../../Redux/Features/Masters/OperatorMaster/thunks";
import { mapToOperatorTableType } from "../../Redux/Features/Masters/OperatorMaster/utils";
import ShimmerTableRows from "../../Components/Atoms/ShimmerTableRows";
import { headers, OperatorTableType } from "../../Config/Master/OperatorConfig";

const OperatorMaster = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, loaded, operators } = useAppSelector(
    (state) => state.masters.operator
  );
  const [searchValue, setSearchValue] = useState("");

  const handleEdit = (id: any) => {
    navigate(`/master/operator-master/edit/${id}`, { state: id });
  };

  const handleAdd = () => {
    navigate("/master/operator-master/add");
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  useEffect(() => {
    if (!loaded) {
      dispatch(fetchOperator());
    }
  }, []);

  const data = operators?.map(mapToOperatorTableType);

  return (
    <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col">
      <TextComponent fontSize={22} fontFamily="Manrope" fontWeight={500}>
        Operator Master
      </TextComponent>

      <GenericMasterToolbar
        addButtonText="Add Operator"
        onAdd={handleAdd}
        onSearchChange={handleSearchChange}
        searchValue={searchValue}
      />

      {loading ? (
        // Render shimmer
        <ShimmerTableRows rowCount={6} columnCount={headers.length} />
      ) : (
        <GenericMasterTable<OperatorTableType>
          data={data}
          headers={headers}
          renderExtraHeader={() => <></>} // empty header for action column/>
          renderExtraRowCell={(item) => (
            <div className="flex justify-center gap-2">
              <span className="cursor-pointer">
                <EyeIcon />
              </span>
              <span
                onClick={() => handleEdit(item?.id ?? "")}
                className="cursor-pointer"
              >
                <EditIcon />
              </span>
            </div>
          )}
        />
      )}
    </div>
  );
};

export default OperatorMaster;
