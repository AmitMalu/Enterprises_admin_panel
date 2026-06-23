import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Tooltip } from "@mantine/core";
import TextComponent from "../../Components/Atoms/TextComponent";
import GenericMasterToolbar from "../../Components/Organisms/GenericMasterToolbar";
import GenericMasterTable from "../../Components/Organisms/GenericMasterTable";
import ShimmerTableRows from "../../Components/Atoms/ShimmerTableRows";
import { useFetchMasterList } from "../../Utils/hooks/useFetchMasterList";
import { useAppDispatch } from "../../Redux/hooks";
import { resetMaster } from "../../Redux/Features/Masters/MastersSlice";
import { downloadFileThunk } from "../../Redux/Features/Masters/MastersThunk";
import { exportToCsv, pageSizeSelectData } from "../../Utils/utils";
import { DownloadIcon } from "../../assets/Icons";
import {
  DOWNLOAD_REPORT_WALLET_KEY,
  DOWNLOAD_REPORT_WALLET_URL,
  downloadReportWalletHeaders,
  DownloadReportWalletTableType,
} from "../../Config/Reports/DownloadReportWalletConfig";

const DownloadReportWallet = () => {
  const dispatch = useAppDispatch();

  const dataRef = useRef<DownloadReportWalletTableType[] | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    downloadReportWalletHeaders.map((h) => h.key as string)
  );
  const [filterVisible, setFilterVisible] = useState(false);
  const [filterValues, setFilterValues] = useState<Record<string, any>>({});
  const [submittedFilter, setSubmittedFilter] = useState<Record<string, any> | null>(null);

  const { data, loading, error, pagination, setPage, setPageSize } =
    useFetchMasterList<DownloadReportWalletTableType>({
      key: DOWNLOAD_REPORT_WALLET_KEY,
      url: `${DOWNLOAD_REPORT_WALLET_URL}/list`,
      method: "GET",
      filter: submittedFilter,
      refreshKey,
    });

  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  const handleToggleColumn = (key: string) => {
    setVisibleColumns((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleToggleAllColumns = (selectAll: boolean) => {
    setVisibleColumns(
      selectAll ? downloadReportWalletHeaders.map((h) => h.key as string) : []
    );
  };

  const handleRefresh = () => {
    dispatch(resetMaster(DOWNLOAD_REPORT_WALLET_KEY));
    setVisibleColumns(downloadReportWalletHeaders.map((h) => h.key as string));
    setFilterVisible(false);
    setFilterValues({});
    setSubmittedFilter(null);
    setRefreshKey((prev) => prev + 1);
  };

  const handleExportClick = () => {
    const currentData = dataRef.current;
    if (!currentData || currentData.length === 0) {
      toast.warning("No data available to export.");
      return;
    }
    exportToCsv(currentData, "Download-Report-Wallet");
  };

  const handleFilterChange = (key: string, value: any) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleFilterSubmit = (key: string, value: any) => {
    setSubmittedFilter((prev) => ({ ...prev, [key]: value }));
  };

  const handleDownload = (item: DownloadReportWalletTableType) => {
    dispatch(
      downloadFileThunk({
        url: `${DOWNLOAD_REPORT_WALLET_URL}/download/${item.id}`,
        filename: item.fileName,
      })
    );
  };

  return (
    <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col">
      <TextComponent fontSize={22} fontFamily="Inter" fontWeight={600}>
        Download Report
      </TextComponent>

      <GenericMasterToolbar
        onRefresh={handleRefresh}
        onColumnChange={handleToggleColumn}
        onToggleAll={handleToggleAllColumns}
        onExport={handleExportClick}
        onFilter={() => setFilterVisible((prev) => !prev)}
        headers={downloadReportWalletHeaders}
        visibleColumns={visibleColumns}
        loading={loading}
        error={error ? error.toString() : null}
      />

      {loading ? (
        <ShimmerTableRows
          rowCount={6}
          columnCount={downloadReportWalletHeaders.length}
        />
      ) : (
        <GenericMasterTable<DownloadReportWalletTableType>
          data={data}
          headers={downloadReportWalletHeaders.filter((h) =>
            visibleColumns.includes(h.key as string)
          )}
          renderExtraHeader={() => <>Action</>}
          renderExtraRowCell={(item) => (
            <div className="flex justify-center gap-2 min-w-10">
              <Tooltip
                label="Download File"
                withArrow={false}
                styles={{
                  tooltip: {
                    backgroundColor: "grey",
                    color: "white",
                    fontSize: "12px",
                  },
                }}
              >
                <span
                  onClick={() => handleDownload(item)}
                  className="cursor-pointer"
                >
                  <DownloadIcon />
                </span>
              </Tooltip>
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

export default DownloadReportWallet;
