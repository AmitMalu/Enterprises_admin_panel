import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../Redux/hooks";
import { useEffect, useRef, useState } from "react";
import { headers, KEY, URL, UserAuthTableType } from "../../Config/Management/UserAuthConfig";
import { useFetchMasterList } from "../../Utils/hooks/useFetchMasterList";
import { resetMaster, setPagination } from "../../Redux/Features/Masters/MastersSlice";
import { toast } from "react-toastify";
import { exportToCsv, pageSizeSelectData } from "../../Utils/utils";
import TextComponent from "../../Components/Atoms/TextComponent";
import GenericMasterToolbar from "../../Components/Organisms/GenericMasterToolbar";
import ShimmerTableRows from "../../Components/Atoms/ShimmerTableRows";
import GenericMasterTable from "../../Components/Organisms/GenericMasterTable";
import { EditIcon } from "../../assets/Icons";

const PendingUser = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [filterVisible, setFilterVisible] = useState(false);
  const [filterValues, setFilterValues] = useState<Record<string, any>>({});
  const [refreshKey, setRefreshKey] = useState(0);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    headers.map((h) => h.key as string)
  );
  const dataRef = useRef<UserAuthTableType[] | null>(null);

  const [submittedFilter, setSubmittedFilter] = useState<Record<string, any> | null>(null);

  const { data, loading, error, pagination, setPage, setPageSize } =
    useFetchMasterList<UserAuthTableType>({
      key: KEY,
      url: `${URL}/getAll-records?status=pending`,
      filter: submittedFilter,
      refreshKey,
      method: "POST",
      defaultPageSize: 5
    });

  const handleEdit = (item: any) => {
    navigate(`/management/user/pending/edit/${item.type}/${item.id}`);
  };
  // const handleAdd = () => {
  //   // navigate("/management/userconfig/add");
  // };

  const handleFilterChange = (key: string, value: any) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleFilterSubmit = (key: string, value: any) => {
    dispatch(
      setPagination({
        key: KEY,
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
    exportToCsv(currentData, "Pending Users");
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
    dispatch(resetMaster(KEY));
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
      {/* Heading */}
      <TextComponent fontSize={22} fontFamily="Inter" fontWeight={600}>
        Pending Users
      </TextComponent>

      {/* Toolbar */}
      <GenericMasterToolbar
        headers={headers}
        onRefresh={handleRefresh}
        onColumnChange={handleToggleColumn}
        onToggleAll={handleToggleAllColumns}
        onExport={handleExportClick}
        onFilter={() => setFilterVisible((prev) => !prev)}
        visibleColumns={visibleColumns}
        loading={loading}
        error={error ? error.toString() : null}
      />

      {/*Table */}
      {loading ? (
        // Render shimmer
        <ShimmerTableRows rowCount={6} columnCount={headers.length} />
      ) : (
        <GenericMasterTable<UserAuthTableType>
          data={data}
          headers={headers.filter((h) =>
            visibleColumns.includes(h.key as string)
          )}
          renderExtraHeader={() => <>Action</>} // empty header for action column/>
          renderExtraRowCell={(item) => (
            <div className="flex justify-center gap-2 min-w-10">
              <span
                onClick={() => handleEdit(item)}
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

export default PendingUser;
