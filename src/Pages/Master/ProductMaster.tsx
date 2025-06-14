import React, { useEffect, useState } from "react";
import TextComponent from "../../Components/Atoms/TextComponent";
import { EditIcon, EyeIcon } from "../../assets/Icons";
import { headers, ProductType } from "../../Config/Master/ProductConfig";
import { useNavigate } from "react-router-dom";
import GenericMasterToolbar from "../../Components/Organisms/GenericMasterToolbar";
import GenericMasterTable from "../../Components/Organisms/GenericMasterTable";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { fetchProduct } from "../../Redux/Features/Masters/ProductMaster/thunks";
import { transformProductToFormData } from "../../Redux/Features/Masters/ProductMaster/utils";
import ShimmerTableRows from "../../Components/Atoms/ShimmerTableRows";
import {
  setCurrentPage,
  setPageSize,
} from "../../Redux/Features/Masters/ProductMaster/slice";
import { toast } from "react-toastify";
import { pageSizeSelectData } from "../../Utils/utils";

const ProductMaster = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { products, loading, pagination } = useAppSelector(
    (state) => state.masters.product
  );

  const pageSize = pagination.pageSize;
  const currentPage = pagination.currentPage;

  const transformedData: ProductType[] = products?.map(
    transformProductToFormData
  );

  const [searchValue, setSearchValue] = useState("");

  const setPage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const OnPageSizeChange = (size: number) => {
    dispatch(setPageSize(size));
  };

  const handleEdit = (id: string) => {
    navigate(`/master/product-master/edit/${id}`, { state: id });
  };

  const handleAdd = () => {
    navigate("/master/product-master/add");
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  useEffect(() => {
    dispatch(fetchProduct({ page: currentPage, size: pageSize }))
      .unwrap()
      .then()
      .catch((err) => toast.error(err));
  }, [currentPage, pageSize]);

  return (
    <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col">
      <TextComponent fontSize={22} fontFamily="Manrope" fontWeight={500}>
        Product Master
      </TextComponent>

      <GenericMasterToolbar
        addButtonText="Add Product"
        onAdd={handleAdd}
        onSearchChange={handleSearchChange}
        searchValue={searchValue}
      />

      {loading ? (
        // Render shimmer
        <ShimmerTableRows rowCount={6} columnCount={headers.length} />
      ) : (
        <GenericMasterTable<ProductType>
          data={transformedData}
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

export default ProductMaster;
