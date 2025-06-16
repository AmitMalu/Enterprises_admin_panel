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
import {
  resetAllStates,
  setCurrentPage,
  setLoaded,
  setPageSize,
} from "../../Redux/Features/Masters/OperatorMaster/slice";
import { pageSizeSelectData } from "../../Utils/utils";

const OperatorMaster = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, operators, pagination, loaded } = useAppSelector(
    (state) => state.masters.operator
  );

  const currentPage = pagination.currentPage;
  const pageSize = pagination.pageSize;

  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const transformedData: OperatorTableType[] = operators?.map(
    mapToOperatorTableType
  );

  const setPage = (page: number) => {
    if (page !== currentPage) {
      dispatch(setCurrentPage(page));
      dispatch(setLoaded(false));
    }
  };

  const OnPageSizeChange = (size: number) => {
    dispatch(setLoaded(false));
    dispatch(setCurrentPage(1));
    dispatch(setPageSize(size));
  };

  const handleEdit = (id: any) => {
    navigate(`/master/operator-master/edit/${id}`, { state: id });
  };

  const handleAdd = () => {
    navigate("/master/operator-master/add");
  };

  const handleSearchChange = (value: string) => {
    setInputValue(value);
  };

  const handleRefresh = () => {
    dispatch(resetAllStates());
    setInputValue("");
    setSearchValue("");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchValue(inputValue.toLowerCase());
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue]);

  useEffect(() => {
    dispatch(fetchOperator({ page: currentPage, size: pageSize }))
      .unwrap()
      .then()
      .catch((err) => toast.error(err));
  }, [currentPage, pageSize, loaded]);

  return (
    <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col">
      <TextComponent fontSize={22} fontFamily="Manrope" fontWeight={500}>
        Operator Master
      </TextComponent>

      <GenericMasterToolbar
        addButtonText="Add Operator"
        onAdd={handleAdd}
        onRefresh={handleRefresh}
        onSearchChange={handleSearchChange}
        searchValue={searchValue}
      />

      {loading ? (
        // Render shimmer
        <ShimmerTableRows rowCount={6} columnCount={headers.length} />
      ) : (
        <GenericMasterTable<OperatorTableType>
          data={transformedData}
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
          onPageSizeChange={OnPageSizeChange}
          pageSize={pageSize}
          pageSizeOptions={pageSizeSelectData}
          message={`Showing page ${pagination.currentPage} of ${pagination.totalPages}`}
        />
      )}
    </div>
  );
};  

export default OperatorMaster;
