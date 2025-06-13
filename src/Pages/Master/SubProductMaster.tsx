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
  setCurrentPage,
  setPageSize,
} from "../../Redux/Features/Masters/SubProductMaster/slice";
import { toast } from "react-toastify";

const SubProductMaster = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, subProducts, pagination } = useAppSelector(
    (state) => state.masters.subProduct
  );
  const currentPage = pagination.currentPage;
  const [searchValue, setSearchValue] = useState("");

  const handleEdit = (id: string) => {
    navigate(`/master/sub-product-master/edit/${id}`, { state: id });
  };

  const setPage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const handleAdd = () => {
    navigate("/master/sub-product-master/add");
  };

  useEffect(() => {
    dispatch(fetchSubProduct({ page: currentPage, size: 5 }))
      .unwrap()
      .then()
      .catch((err) => toast.error(err));
  }, [currentPage]);

  const data = subProducts?.map(mapToSubProductTableType);

  return (
    <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col">
      <TextComponent fontSize={22} fontFamily="Manrope" fontWeight={500}>
        Sub Product Master
      </TextComponent>

      <GenericMasterToolbar
        addButtonText="Add Sub Product"
        onAdd={handleAdd}
        onSearchChange={handleSearchChange}
        searchValue={searchValue}
      />

      {loading ? (
        // Render shimmer
        <ShimmerTableRows rowCount={6} columnCount={headers.length} />
      ) : (
        <GenericMasterTable<SubProductTableType>
          data={data}
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
          message={`Showing page ${pagination.currentPage} of ${pagination.totalPages}`}
        />
      )}
    </div>
  );
};

export default SubProductMaster;
