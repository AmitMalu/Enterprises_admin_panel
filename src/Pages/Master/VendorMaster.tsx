import { useEffect, useRef, useState } from "react";
import TextComponent from "../../Components/Atoms/TextComponent";
import { EditIcon } from "../../assets/Icons";
import { useNavigate } from "react-router-dom";
import GenericMasterTable from "../../Components/Organisms/GenericMasterTable";
import GenericMasterToolbar from "../../Components/Organisms/GenericMasterToolbar";
import { useAppDispatch } from "../../Redux/hooks";
import { toast } from "react-toastify";
import ShimmerTableRows from "../../Components/Atoms/ShimmerTableRows";
import {
  headers,
  mapToVendorTableType,
  MASTER_KEY,
  MASTER_URL,
  VendorTableType,
} from "../../Config/Master/VendorConfig";
import { exportToCsv, pageSizeSelectData } from "../../Utils/utils";
import {
  resetMaster,
  setPagination,
} from "../../Redux/Features/Masters/MastersSlice";
import { useFetchMasterList } from "../../Utils/hooks/useFetchMasterList";

const VendorMaster = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [filterVisible, setFilterVisible] = useState(false);
  const [filterValues, setFilterValues] = useState<Record<string, any>>({});
  const [refreshKey, setRefreshKey] = useState(0);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    headers.map((h) => h.key as string)
  );
  const dataRef = useRef<VendorTableType[] | null>(null);

  const [submittedFilter, setSubmittedFilter] = useState<Record<string, any> | null>(null);

  const { data, loading, pagination, error, setPage, setPageSize } =
    useFetchMasterList<VendorTableType>({
      key: MASTER_KEY,
      url: MASTER_URL,
      transformDataFn: mapToVendorTableType,
      filter: submittedFilter,
      refreshKey,
      defaultPageSize: 5
    });

  const handleEdit = (id: any) => {
    navigate(`/master/vendor/edit/${id}`, { state: id });
  };

  const handleAdd = () => {
    navigate("/master/vendor/add");
  };
  const handleFilterChange = (key: string, value: any) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleFilterSubmit = (key: string, value: any) => {
    dispatch(
      setPagination({
        key: MASTER_KEY,
        pagination: { ...pagination, currentPage: 1, pageSize: pagination.pageSize },
      })
    );
    setSubmittedFilter((prev) => ({ ...prev, [key]: value }));
  };

  const handleExportClick = () => {
    const currentData = dataRef.current;
    if (!currentData || currentData.length === 0) {
      toast.warning("No data available to export.");
      return;
    }
    exportToCsv(currentData, "vendor-master");
  };

  const handleToggleColumn = (key: string) => {
    setVisibleColumns((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleToggleAllColumns = (selectAll: boolean) => {
      if (selectAll) {
        setVisibleColumns(headers.map((h) => h.key as string));
      } else {
        setVisibleColumns([]);
      }
    };

  const handleRefresh = () => {
    dispatch(resetMaster(MASTER_KEY));
    setFilterValues({});
    setSubmittedFilter(null);
    setVisibleColumns(headers.map((h) => h.key as string));
    setRefreshKey((prev) => prev + 1);
    setFilterVisible(false);
  };

  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  return (
    <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col">
      <TextComponent fontSize={22} fontFamily="Inter" fontWeight={600}>
        Vendor Master
      </TextComponent>

      <GenericMasterToolbar
        addButtonText="Add Vendor"
        onAdd={handleAdd}
        onRefresh={handleRefresh}
        onColumnChange={handleToggleColumn}
        onToggleAll={handleToggleAllColumns}
        onExport={handleExportClick}
        onFilter={() => setFilterVisible((prev) => !prev)}
        headers={headers}
        visibleColumns={visibleColumns}
        loading={loading}
        error={error ? error.toString() : null}
      />

      {loading ? (
        // Render shimmer
        <ShimmerTableRows rowCount={6} columnCount={headers.length} />
      ) : (
        <GenericMasterTable<VendorTableType>
          data={data}
          headers={headers.filter((h) =>
            visibleColumns.includes(h.key as string)
          )}
          renderExtraHeader={() => <></>} // empty header for action column/>
          renderExtraRowCell={(item) => (
            <div className="flex justify-center gap-2 min-w-10">
              {/* <span className="cursor-pointer">
                <EyeIcon />
              </span> */}
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
          onPageSizeChange={setPageSize}
          pageSize={pagination.pageSize}
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
export default VendorMaster;
