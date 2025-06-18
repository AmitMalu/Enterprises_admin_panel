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
import { exportToCsv, pageSizeSelectData } from "../../Utils/utils";

const SubProductMaster = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, subProducts, pagination, loaded } = useAppSelector(
    (state) => state.masters.subProduct
  );
  const currentPage = pagination.currentPage;
  const pageSize = pagination.pageSize;

  const [filterVisible, setFilterVisible] = useState(false);
  const [filterValues, setFilterValues] = useState<Record<string, any>>({});
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    headers.map((h) => h.key as string)
  );
  const [submittedFilter, setSubmittedFilter] = useState<{
    key: string;
    value: any;
  } | null>(null);

  const FilteredData: SubProductTableType[] = subProducts?.map(
    mapToSubProductTableType
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
    dispatch(setCurrentPage(1));
    dispatch(setPageSize(5));
    setSubmittedFilter({ key, value });
    dispatch(setLoaded(false));
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

  const handleRefresh = () => {
    dispatch(resetAllStates());
    setFilterValues({});
    setFilterVisible(false);
    setSubmittedFilter(null);
    setVisibleColumns(headers.map((h) => h.key as string));
  };

  const handleToggleColumn = (key: string) => {
    setVisibleColumns((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleExportClick = () => {
    if (!FilteredData || FilteredData.length === 0) {
      toast.warning("No data available to export.");
      return;
    }

    exportToCsv(FilteredData, "sub-product-master");
  };

  useEffect(() => {
    if (!loaded) {
      dispatch(
        fetchSubProduct({
          page: currentPage,
          size: pageSize,
          filter: submittedFilter,
        })
      )
        .unwrap()
        .then()
        .catch((err) => toast.error(err));
    }
  }, [currentPage, pageSize, loaded, submittedFilter]);

  return (
    <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col">
      <TextComponent fontSize={22} fontFamily="Manrope" fontWeight={500}>
        Sub Product Master
      </TextComponent>

      <GenericMasterToolbar
        addButtonText="Add Sub Product"
        onAdd={handleAdd}
        onRefresh={handleRefresh}
        onColumnChange={handleToggleColumn}
        onExport={handleExportClick}
        onFilter={() => setFilterVisible((prev) => !prev)}
        headers={headers}
        visibleColumns={visibleColumns}
      />

      {loading ? (
        // Render shimmer
        <ShimmerTableRows rowCount={6} columnCount={headers.length} />
      ) : (
        <GenericMasterTable<SubProductTableType>
          data={FilteredData}
          headers={headers.filter((h) =>
            visibleColumns.includes(h.key as string)
          )}
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

export default SubProductMaster;
