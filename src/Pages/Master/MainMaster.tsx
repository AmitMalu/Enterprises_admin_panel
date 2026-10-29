import { useNavigate } from "react-router-dom";
import ShimmerTableRows from "../../Components/Atoms/ShimmerTableRows";
import TextComponent from "../../Components/Atoms/TextComponent";
import GenericMasterTable from "../../Components/Organisms/GenericMasterTable";
import GenericMasterToolbar from "../../Components/Organisms/GenericMasterToolbar";
import {
  headers,
  MainMasterTableType,
  mapToMainMasterTableType,
  MASTER_KEY,
  MASTER_URL,
} from "../../Config/Master/MainMasterConfig";
import { useAppDispatch } from "../../Redux/hooks";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { exportToCsv, pageSizeSelectData } from "../../Utils/utils";
import {
  resetMaster,
  setPagination,
} from "../../Redux/Features/Masters/MastersSlice";
import { useFetchMasterList } from "../../Utils/hooks/useFetchMasterList";

const MainMaster = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [filterVisible, setFilterVisible] = useState(false);
  const [filterValues, setFilterValues] = useState<Record<string, any>>({});
  const [refreshKey, setRefreshKey] = useState(0);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    headers.map((h) => h.key as string)
  );
  const dataRef = useRef<MainMasterTableType[] | null>(null);

  const [submittedFilter, setSubmittedFilter] = useState<Record<string, any> | null>(null);

  const { data, loading, error, pagination, setPage, setPageSize } =
    useFetchMasterList<MainMasterTableType>({
      key: MASTER_KEY,
      url: MASTER_URL,
      transformDataFn: mapToMainMasterTableType,
      filter: submittedFilter,
      refreshKey,
      defaultPageSize: 5
    });

  const handleAdd = () => {
    navigate("/master/main/add");
  };

  // const handleEdit = (id: string) => {
  //   navigate(`/master/main/edit/${id}`, { state: id });
  // };

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
    exportToCsv(currentData, "main-master");
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
        Dropdown Lists
      </TextComponent>

      <GenericMasterToolbar
        addButtonText="Add Master"
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
        <GenericMasterTable<MainMasterTableType>
          data={data}
          headers={headers.filter((h) =>
            visibleColumns.includes(h.key as string)
          )}
          // renderExtraHeader={() => <></>} // empty header for action column/>
          // renderExtraRowCell={() => (
          //   <div className="flex justify-center gap-2">
          //     <span className="cursor-pointer">
          //       <EyeIcon />
          //     </span>
          //     {/* <span   No Edit For Master
          //       onClick={() => handleEdit(String(item?.scsMasterId ?? ""))}
          //       className="cursor-pointer"
          //     >
          //       <EditIcon />
          //     </span> */}
          //   </div>
          // )}
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

export default MainMaster;
