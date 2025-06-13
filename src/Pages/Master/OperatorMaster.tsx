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
import { toast } from "react-toastify";
import { setCurrentPage } from "../../Redux/Features/Masters/OperatorMaster/slice";

const OperatorMaster = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, operators, pagination } = useAppSelector(
    (state) => state.masters.operator
  );

  const currentPage = pagination.currentPage;
  const [searchValue, setSearchValue] = useState("");

  const setPage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

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
    dispatch(fetchOperator({ page: currentPage, size: 5 }))
      .unwrap()
      .then()
      .catch((err) => toast.error(err));
  }, [currentPage]);

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
          pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={setPage}
          message={`Showing page ${pagination.currentPage} of ${pagination.totalPages}`}
        />
      )}
    </div>
  );
};

export default OperatorMaster;
