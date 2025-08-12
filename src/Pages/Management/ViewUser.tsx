import { useEffect, useMemo, useRef, useState } from "react";
import { useAppDispatch } from "../../Redux/hooks";
import { VIEW_USER_KEY, VIEW_USER_URL, ViewUserHeaders, ViewUserTableType } from "../../Config/Management/ViewUserConfig";
import { useFetchMasterList } from "../../Utils/hooks/useFetchMasterList";
import { resetMaster } from "../../Redux/Features/Masters/MastersSlice";
import { toast } from "react-toastify";
import { exportToCsv, pageSizeSelectData } from "../../Utils/utils";
import TextComponent from "../../Components/Atoms/TextComponent";
import GenericMasterToolbar from "../../Components/Organisms/GenericMasterToolbar";
import ShimmerTableRows from "../../Components/Atoms/ShimmerTableRows";
import GenericMasterTable from "../../Components/Organisms/GenericMasterTable";
import debounce from "lodash.debounce";

const ViewUser = () => {

  const dispatch = useAppDispatch();
  const [refreshKey, setRefreshKey] = useState(0);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    ViewUserHeaders.map((h) => h.key as string)
  );
  const dataRef = useRef<ViewUserTableType[] | null>(null);

  const [search, setSearch] = useState("")
  const [debouncedSearchValue, setDebouncedSearchValue] = useState<string | null>("");

  const { data, loading, error, pagination, setPage, setPageSize } =
    useFetchMasterList<ViewUserTableType>({
      key: VIEW_USER_KEY,
      url: `${VIEW_USER_URL}`,
      filter: { hierarchyId: debouncedSearchValue },
      refreshKey,
      method: "GET"
    });

  const debouncedSearch = useMemo(
    () =>
      debounce((val: string) => {
        setDebouncedSearchValue(val); // store it here
      }, 500),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setSearch(newVal); // update input instantly
    debouncedSearch(newVal); // debounce actual action (e.g. API call)
  };

  const handleExportClick = () => {
    const currentData = dataRef.current;
    if (!currentData || currentData.length === 0) {
      toast.warning("No data available to export.");
      return;
    }
    exportToCsv(currentData, "View Users");
  };


  const handleToggleColumn = (key: string) => {
    setVisibleColumns((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleRefresh = () => {
    dispatch(resetMaster(VIEW_USER_KEY));
    setSearch("")
    setDebouncedSearchValue("")
    setVisibleColumns(ViewUserHeaders.map((h) => h.key as string));
    setRefreshKey((prev) => prev + 1);
  };

  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  return (
    <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col">
      {/* Heading */}
      <TextComponent fontSize={22} fontFamily="Inter" fontWeight={600}>
        View Users
      </TextComponent>

      {/* Toolbar */}
      <GenericMasterToolbar
        headers={ViewUserHeaders}
        onSearch={handleSearchChange}
        searchValue={search}
        onRefresh={handleRefresh}
        onColumnChange={handleToggleColumn}
        onExport={handleExportClick}
        visibleColumns={visibleColumns}
        loading={loading}
        error={error ? error.toString() : null}
      />

      {/*Table */}
      {loading ? (
        // Render shimmer
        <ShimmerTableRows rowCount={6} columnCount={ViewUserHeaders.length} />
      ) : (
        <GenericMasterTable<ViewUserTableType>
          data={data}
          headers={ViewUserHeaders.filter((h) =>
            visibleColumns.includes(h.key as string)
          )}
          pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
          pageSize={pagination.pageSize}
          pageSizeOptions={pageSizeSelectData}
          message={`Showing page ${pagination.currentPage} of ${pagination.totalPages}`}
        />
      )}
    </div>
  );
};

export default ViewUser;
