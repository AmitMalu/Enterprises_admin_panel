import React, { useEffect, useState } from "react";
import TextComponent from "../../Components/Atoms/TextComponent";
import { EditIcon, EyeIcon } from "../../assets/Icons";
import { headers, ProductTableType } from "../../Config/Master/ProductConfig";
import { useNavigate } from "react-router-dom";
import GenericMasterToolbar from "../../Components/Organisms/GenericMasterToolbar";
import GenericMasterTable from "../../Components/Organisms/GenericMasterTable";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { fetchProduct } from "../../Redux/Features/Masters/ProductMaster/thunks";
import { transformProductToFormData } from "../../Redux/Features/Masters/ProductMaster/utils";
import ShimmerTableRows from "../../Components/Atoms/ShimmerTableRows";
import {
  resetAllStates,
  setCurrentPage,
  setLoaded,
  setPageSize,
} from "../../Redux/Features/Masters/ProductMaster/slice";
import { toast } from "react-toastify";
import { pageSizeSelectData } from "../../Utils/utils";

const ProductMaster = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { products, loading, pagination, loaded } = useAppSelector(
    (state) => state.masters.product
  );

  const pageSize = pagination.pageSize;
  const currentPage = pagination.currentPage;

  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [filterVisible, setFilterVisible] = useState(false);
  const [filterValues, setFilterValues] = useState<Record<string, any>>({});

  const transformedData: ProductTableType[] = products
    ?.map(transformProductToFormData)
    ?.filter((product) =>
      searchValue ? product.name.toLowerCase().includes(searchValue) : true
    );

  const handleFilterChange = (key: string, value: any) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }));
  };

  const setPage = (page: number) => {
    if (page !== currentPage) {
      dispatch(setCurrentPage(page));
      dispatch(setLoaded(false));
    }
  };

  const handleFilterSubmit = (key: string, value: any) => {
    // Example: only include one filter key at a time
    console.log("submitted", key, value);
  };

  const OnPageSizeChange = (size: number) => {
    dispatch(setLoaded(false));
    dispatch(setCurrentPage(1));
    dispatch(setPageSize(size));
  };

  const handleEdit = (id: string) => {
    navigate(`/master/product-master/edit/${id}`, { state: id });
  };

  const handleAdd = () => {
    navigate("/master/product-master/add");
  };

  const handleSearchChange = (value: string) => {
    setInputValue(value);
  };

  const handleRefresh = () => {
    dispatch(resetAllStates());
    setFilterValues({});
    setFilterVisible(false);
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
      dispatch(fetchProduct({ page: currentPage, size: pageSize }))
        .unwrap()
        .then()
        .catch((err) => toast.error(err));
    }
  }, [currentPage, pageSize, loaded]);

  return (
    <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col">
      <TextComponent fontSize={22} fontFamily="Manrope" fontWeight={500}>
        Product Master
      </TextComponent>

      <GenericMasterToolbar
        addButtonText="Add Product"
        onAdd={handleAdd}
        onRefresh={handleRefresh}
        onSearchChange={handleSearchChange}
        searchValue={inputValue}
        onFilter={() => setFilterVisible((prev) => !prev)}
      />

      {loading ? (
        // Render shimmer
        <ShimmerTableRows rowCount={6} columnCount={headers.length} />
      ) : (
        <GenericMasterTable<ProductTableType>
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
          filterVisible={filterVisible}
          filterValues={filterValues}
          onFilterChange={handleFilterChange}
          onFilterSubmit={handleFilterSubmit}
        />
      )}
    </div>
  );
};

export default ProductMaster;
