import { useEffect, useMemo, useState } from "react";
import { useAppDispatch } from "../../Redux/hooks";
import { BLOCK_USER_KEY, BLOCK_USER_URL, BlockUnblockUserHeaders, BlockUnblockUserTableType } from "../../Config/Management/BlockUnblockUserConfig";
import { useFetchMasterList } from "../../Utils/hooks/useFetchMasterList";
import { resetMaster } from "../../Redux/Features/Masters/MastersSlice";
import { toast } from "react-toastify";
import { exportToCsv, pageSizeSelectData } from "../../Utils/utils";
import TextComponent from "../../Components/Atoms/TextComponent";
import GenericMasterToolbar from "../../Components/Organisms/GenericMasterToolbar";
import ShimmerTableRows from "../../Components/Atoms/ShimmerTableRows";
import GenericMasterTable from "../../Components/Organisms/GenericMasterTable";
import debounce from "lodash.debounce";
import { Loader, Tooltip } from "@mantine/core";
import { updateMasterItem } from "../../Redux/Features/Masters/MastersThunk";

const BlockUnblockUser = () => {

  const dispatch = useAppDispatch();
  const [refreshKey, setRefreshKey] = useState(0);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    BlockUnblockUserHeaders.map((h) => h.key as string)
  );
  const [tableData, setTableData] = useState<BlockUnblockUserTableType[]>([]);

  const [search, setSearch] = useState("")
  const [debouncedSearchValue, setDebouncedSearchValue] = useState<string | null>("");
  const [loadingRowId, setLoadingRowId] = useState<string | null>(null); // track row


  const { data, loading, error, pagination, setPage, setPageSize } =
    useFetchMasterList<BlockUnblockUserTableType>({
      key: BLOCK_USER_KEY,
      url: `${BLOCK_USER_URL}`,
      filter: { keyword: debouncedSearchValue },
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
    if (!tableData || tableData.length === 0) {
      toast.warning("No data available to export.");
      return;
    }
    exportToCsv(tableData, "Block-Unblock Users");
  };


  const handleToggleColumn = (key: string) => {
    setVisibleColumns((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleRefresh = () => {
    dispatch(resetMaster(BLOCK_USER_KEY));
    setSearch("")
    setDebouncedSearchValue("")
    setVisibleColumns(BlockUnblockUserHeaders.map((h) => h.key as string));
    setRefreshKey((prev) => prev + 1);
  };

  const handleBlockUnblockUser = async (hierarchyId: string, isBlocked: boolean) => {
    setLoadingRowId(hierarchyId); // set which row is loading
    try {
      await dispatch(updateMasterItem({
        key: BLOCK_USER_KEY,
        id: hierarchyId,
        url: `${BLOCK_USER_URL}/block`,
        data: { block: isBlocked },
        mode: "PUT",
      })).unwrap();

      toast.success(`User ${isBlocked ? "blocked" : "unblocked"} successfully.`);
      // Update local table data without refetch
      setTableData(prev =>
        prev.map(row =>
          row.hierarchyId === hierarchyId
            ? { ...row, isBlocked }
            : row
        )
      );
    } catch (err: any) {
      toast.error(`Failed to Update User Status.`);
      console.error(err);
    } finally {
      setLoadingRowId(null); // clear loading state
    }
  }

  useEffect(() => {
    if (data) {
      setTableData(data);
    }
  }, [data]);

  return (
    <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col">
      {/* Heading */}
      <TextComponent fontSize={22} fontFamily="Inter" fontWeight={600}>
        Block/Unblock Users
      </TextComponent>

      {/* Toolbar */}
      <GenericMasterToolbar
        headers={BlockUnblockUserHeaders}
        onSearch={handleSearchChange}
        searchValue={search}
        onRefresh={handleRefresh}
        onColumnChange={handleToggleColumn}
        onExport={handleExportClick}
        visibleColumns={visibleColumns}
        loading={loading || loadingRowId !== null}
        error={error ? error.toString() : null}
      />

      {/*Table */}
      {loading ? (
        // Render shimmer
        <ShimmerTableRows rowCount={6} columnCount={BlockUnblockUserHeaders.length} />
      ) : (
        <GenericMasterTable<BlockUnblockUserTableType>
          data={tableData}
          headers={BlockUnblockUserHeaders.filter((h) =>
            visibleColumns.includes(h.key as string)
          )}
          renderExtraHeader={() => <>Action</>} // empty header for action column/>
          renderExtraRowCell={(item) => (
            <div className="flex justify-center gap-2">
              <Tooltip
                label={item.isBlocked
                  ? `Click to unblock ${item.hierarchyId}`
                  : `Click to block ${item.hierarchyId}`
                }
                position="top"
                withArrow
              >
                <span
                  onClick={() =>
                    !loadingRowId && handleBlockUnblockUser(item.hierarchyId, !item.isBlocked)
                  }
                  className={`px-4 py-[4px] flex gap-2 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer ${!item.isBlocked ? "bg-red-200 text-red-900" : "bg-green-200 text-green-900"
                    } ${loadingRowId ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {loadingRowId === item.hierarchyId ? (
                    <Loader size="xs" color="dark" />
                  ) : item.isBlocked ? (
                    "Unblock"
                  ) : (
                    "Block"
                  )}
                  {/* {!item.isBlocked && loadingRowId !== item.hierarchyId && <DeactivateIcon color="red" />} */}
                </span>
              </Tooltip>
            </div>
          )
          }
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
    </div >
  );
};

export default BlockUnblockUser;
