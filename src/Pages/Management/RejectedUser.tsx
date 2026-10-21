import { useAppDispatch } from "../../Redux/hooks";
import { useEffect, useRef, useState } from "react";
import { RejectedUserHeaders, KEY, URL, UserAuthTableType } from "../../Config/Management/UserAuthConfig";
import { useFetchMasterList } from "../../Utils/hooks/useFetchMasterList";
import { resetMaster, setPagination } from "../../Redux/Features/Masters/MastersSlice";
import { toast } from "react-toastify";
import { exportToCsv, pageSizeSelectData } from "../../Utils/utils";
import TextComponent from "../../Components/Atoms/TextComponent";
import GenericMasterToolbar from "../../Components/Organisms/GenericMasterToolbar";
import ShimmerTableRows from "../../Components/Atoms/ShimmerTableRows";
import GenericMasterTable from "../../Components/Organisms/GenericMasterTable";
import { IoArrowUndoSharp } from "react-icons/io5";
import PopupModal from "../../Components/Atoms/PopupModal";
import ButtonComponent from "../../Components/Atoms/ButtonComponent";
import { updateMasterItem } from "../../Redux/Features/Masters/MastersThunk";
import { colors } from "../../theme/colors";

const RejectedUsers = () => {

  const dispatch = useAppDispatch();
  const [filterVisible, setFilterVisible] = useState(false);
  const [filterValues, setFilterValues] = useState<Record<string, any>>({});
  const [refreshKey, setRefreshKey] = useState(0);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    RejectedUserHeaders.map((h) => h.key as string)
  );
  const dataRef = useRef<UserAuthTableType[] | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedFilter, setSubmittedFilter] = useState<Record<string, any> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, loading, error, pagination, setPage, setPageSize } =
    useFetchMasterList<UserAuthTableType>({
      key: KEY,
      url: `${URL}/getAll-records?status=rejected`,
      filter: submittedFilter,
      refreshKey,
      method: "POST",
      defaultPageSize: 5
    });

  // const handleEdit = (id: any) => {
  //     navigate(`/management/user/pending/edit/${id}`, { state: id });
  // };

  // const handleAdd = () => {
  //     // navigate("/management/userconfig/add");
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
    exportToCsv(currentData, "Rejected Users");
  };


  const handleToggleColumn = (key: string) => {
    setVisibleColumns((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleToggleAllColumns = (selectAll: boolean) => {
    if (selectAll) {
      setVisibleColumns(RejectedUserHeaders.map((h) => h.key as string));
    } else {
      setVisibleColumns([]);
    }
  };

  const handleRefresh = () => {
    dispatch(resetMaster(KEY));
    setFilterValues({});
    setSubmittedFilter(null);
    setVisibleColumns(RejectedUserHeaders.map((h) => h.key as string));
    setRefreshKey((prev) => prev + 1);
    setFilterVisible(false);
  };

  const handleConfirmRestore = () => {
    if (isSubmitting || !selectedUserId) return;
    setIsSubmitting(true);

    dispatch(updateMasterItem({ key: KEY, url: `${URL}/move-pending/${selectedUserId}`, mode: "PUT" }))
      .unwrap()
      .then(() => {
        toast.success("User restored to Pending successfully");
        setRefreshKey((prev) => prev + 1); // Refresh table
        setIsModalOpen(false);
      })
      .catch((err: any) => {
        toast.error(err || "Failed to restore user");
      })
      .finally(() => {
        setIsSubmitting(false);
        setSelectedUserId(null);
      });
  }

  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  return (
    <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col">
      {/* Heading */}
      <TextComponent fontSize={22} fontFamily="Inter" fontWeight={600}>
        Declined Applications
      </TextComponent>

      {/* Toolbar */}
      <GenericMasterToolbar
        headers={RejectedUserHeaders}
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
        <ShimmerTableRows rowCount={6} columnCount={RejectedUserHeaders.length} />
      ) : (
        <GenericMasterTable<UserAuthTableType>
          data={data}
          headers={RejectedUserHeaders.filter((h) =>
            visibleColumns.includes(h.key as string)
          )}
          renderExtraHeader={() => <>Action</>} // empty header for action column/>
          renderExtraRowCell={(item) => (
            <div className="flex justify-center gap-2 min-w-10">
              <span
                onClick={() => {
                  setSelectedUserId(item.id ?? null); // or item.id, depending on your API
                  setIsModalOpen(true);
                }}
                className="cursor-pointer"
                title="Restore to Pending"
              >
                <IoArrowUndoSharp />
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

      <PopupModal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Restore User to Pending Status"
        titleSize="18px"
        padding="md"
        size="lg"
      >
        <p>Are you sure you want to move <strong>{selectedUserId}</strong> User back to Pending?</p>
        <div className="flex justify-end gap-4 mt-4">
          <ButtonComponent onClick={() => setIsModalOpen(false)} bgColor={colors.border.strong} textColor={colors.text.primary}>
            Cancel
          </ButtonComponent>
          <ButtonComponent onClick={handleConfirmRestore} bgColor={colors.brand.primary} textColor={colors.text.inverse}>
            Confirm
          </ButtonComponent>
        </div>
      </PopupModal>

    </div>
  );
};

export default RejectedUsers;
