import { useEffect, useState } from "react";
import { EditIcon, EyeIcon } from "../../assets/Icons";
import TextComponent from "../../Components/Atoms/TextComponent";
import {
  headers,
  SubProductTableType,
} from "../../Config/Master/SubProductConfig";
import { useNavigate } from "react-router-dom";
import GenericMasterTable from "../../Components/Organisms/GenericMasterTable";
import GenericMasterToolbar from "../../Components/Organisms/GenericMasterToolbar";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { fetchSubProduct } from "../../Redux/Features/Masters/SubProductMaster/thunks";
import { mapToSubProductTableType } from "../../Redux/Features/Masters/SubProductMaster/utils";
import ShimmerTableRows from "../../Components/Atoms/ShimmerTableRows";
import {
  resetAllStates,
  setCurrentPage,
  setLoaded,
  setPageSize,
} from "../../Redux/Features/Masters/SubProductMaster/slice";
import { toast } from "react-toastify";
import { pageSizeSelectData } from "../../Utils/utils";

const SubProductMaster = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, subProducts, pagination, loaded } = useAppSelector(
    (state) => state.masters.subProduct
  );
  const currentPage = pagination.currentPage;
  const pageSize = pagination.pageSize;

  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const FilteredData: SubProductTableType[] = subProducts?.map(
    mapToSubProductTableType
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

  const handleEdit = (id: string) => {
    navigate(`/master/sub-product-master/edit/${id}`, { state: id });
  };
  const handleAdd = () => {
    navigate("/master/sub-product-master/add");
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
    if (!loaded) {
      dispatch(fetchSubProduct({ page: currentPage, size: pageSize }))
        .unwrap()
        .then()
        .catch((err) => toast.error(err));
    }
  }, [currentPage, pageSize, loaded]);

  return (
    <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col">
      <TextComponent fontSize={22} fontFamily="Manrope" fontWeight={500}>
        Sub Product Master
      </TextComponent>

      <GenericMasterToolbar
        addButtonText="Add Sub Product"
        onAdd={handleAdd}
        onRefresh={handleRefresh}
        onSearchChange={handleSearchChange}
        searchValue={searchValue}
      />

      {loading ? (
        // Render shimmer
        <ShimmerTableRows rowCount={6} columnCount={headers.length} />
      ) : (
        <GenericMasterTable<SubProductTableType>
          data={FilteredData}
          headers={headers}
          renderExtraHeader={() => <></>} // empty header for action column/>
          renderExtraRowCell={(item) => (
            <div className="flex justify-center gap-2">
              <span className="cursor-pointer">
                <EyeIcon />
              </span>
              <span
                onClick={() => handleEdit(item?.id || "")}
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

export default SubProductMaster;
