import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../Redux/hooks";
import { useFetchMasterList } from "../../Utils/hooks/useFetchMasterList";
import { resetMaster } from "../../Redux/Features/Masters/MastersSlice";
import { toast } from "react-toastify";
import { exportToCsv, pageSizeSelectData } from "../../Utils/utils";
import TextComponent from "../../Components/Atoms/TextComponent";
import GenericMasterToolbar from "../../Components/Organisms/GenericMasterToolbar";
import ShimmerTableRows from "../../Components/Atoms/ShimmerTableRows";
import GenericMasterTable from "../../Components/Organisms/GenericMasterTable";
import { KYC_APPROVED_KEY, KYC_APPROVED_URL, KycApprovedHeaders, KycApprovedTableType } from "../../Config/Management/KycApprovedConfig";

const KycApprovedSummary = () => {

  const dispatch = useAppDispatch();
  const [refreshKey, setRefreshKey] = useState(0);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    KycApprovedHeaders.map((h) => h.key as string)
  );
  const dataRef = useRef<KycApprovedTableType[] | null>(null);
  const [search, setSearch] = useState("")
  const payloadRef = useRef<any>(null);

  const { data, loading, error, pagination, setPage, setPageSize } =
    useFetchMasterList<KycApprovedTableType>({
      key: KYC_APPROVED_KEY,
      url: payloadRef.current ? `${KYC_APPROVED_URL}/approved-documents` : undefined,
      payload: payloadRef.current,
      refreshKey,
      method: "POST",
    });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value); // update instantly
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      payloadRef.current = { searchKeyword: search };
      setRefreshKey((prev) => prev + 1);
    }
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

  const handleToggleAllColumns = (selectAll: boolean) => {
      if (selectAll) {
        setVisibleColumns(KycApprovedHeaders.map((h) => h.key as string));
      } else {
        setVisibleColumns([]);
      }
    };

  const handleRefresh = () => {
    dispatch(resetMaster(KYC_APPROVED_KEY));
    setSearch("")
    setVisibleColumns(KycApprovedHeaders.map((h) => h.key as string));
    payloadRef.current = { searchKeyword: "" };
    setRefreshKey((prev) => prev + 1);
  };

  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  return (
    <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col">
      {/* Heading */}
      <TextComponent fontSize={22} fontFamily="Inter" fontWeight={600}>
        KYC APPROVED SUMMARY
      </TextComponent>

      {/* Toolbar */}
      <GenericMasterToolbar
        headers={KycApprovedHeaders}
        onSearch={handleSearchChange}
        onKeyDown={handleKeyDown}
        searchValue={search}
        searchPlaceholder="Search using RT, DT, BZT-RT-001"
        onRefresh={handleRefresh}
        onColumnChange={handleToggleColumn}
        onToggleAll={handleToggleAllColumns}
        onExport={handleExportClick}
        visibleColumns={visibleColumns}
        loading={loading}
        error={error ? error.toString() : null}
      />

      {/*Table */}
      {loading ? (
        // Render shimmer
        <ShimmerTableRows rowCount={6} columnCount={KycApprovedHeaders.length} />
      ) : (
        <GenericMasterTable<KycApprovedTableType>
          data={data}
          headers={KycApprovedHeaders.filter((h) =>
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

export default KycApprovedSummary;
