import { useNavigate } from "react-router-dom";
import { EditIcon, EyeIcon } from "../../assets/Icons";
import ShimmerTableRows from "../../Components/Atoms/ShimmerTableRows";
import TextComponent from "../../Components/Atoms/TextComponent";
import GenericMasterTable from "../../Components/Organisms/GenericMasterTable";
import GenericMasterToolbar from "../../Components/Organisms/GenericMasterToolbar";
import { DropdownTableType, headers } from "../../Config/Master/DropdownConfig";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { useEffect, useState } from "react";
import { mapToDropdownTableType } from "../../Redux/Features/Masters/DropdownMaster/utils";
import {
  resetAllStates,
  setCurrentPage,
  setLoaded,
  setPageSize,
} from "../../Redux/Features/Masters/DropdownMaster/slice";
import { toast } from "react-toastify";
import { exportToCsv, pageSizeSelectData } from "../../Utils/utils";
import { fetchDropdownList } from "../../Redux/Features/Masters/DropdownMaster/thunks";

const DropdownMaster = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, dropdownMasterList, pagination, loaded } = useAppSelector(
    (state) => state.masters.dropdown
  );

  const currentPage = pagination.currentPage;
  const pageSize = pagination.pageSize;

  const [filterVisible, setFilterVisible] = useState(false);
  const [filterValues, setFilterValues] = useState<Record<string, any>>({});
  const [refreshKey, setRefreshKey] = useState(0);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    headers.map((h) => h.key as string)
  );
  const [submittedFilter, setSubmittedFilter] = useState<{
    key: string;
    value: any;
  } | null>(null);

  const transformedData: DropdownTableType[] = dropdownMasterList?.map(
    mapToDropdownTableType
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

  const handleEdit = (id: any) => {
    // navigate(`/master/dropdown-master/edit/${id}`, { state: id });
  };

  const handleAdd = () => {
    navigate("/master/dropdown-master/add");
  };

  const handleRefresh = () => {
    dispatch(resetAllStates());
    setFilterValues({});
    setFilterVisible(false);
    setSubmittedFilter(null);
    setVisibleColumns(headers.map((h) => h.key as string));
    setRefreshKey((prev) => prev + 1);
  };

  const handleToggleColumn = (key: string) => {
    setVisibleColumns((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleExportClick = () => {
    if (!transformedData || transformedData.length === 0) {
      toast.warning("No data available to export.");
      return;
    }

    exportToCsv(transformedData, "dropdown-master");
  };

  useEffect(() => {
    dispatch(
      fetchDropdownList({
        page: currentPage,
        size: pageSize,
        filter: submittedFilter,
      })
    )
      .unwrap()
      .then()
      .catch((err) => toast.error(err));
  }, [currentPage, pageSize, loaded, submittedFilter, refreshKey]);

  return (
    <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col">
      <TextComponent fontSize={22} fontFamily="Manrope" fontWeight={500}>
        Dropdown Master
      </TextComponent>

      <GenericMasterToolbar
        addButtonText="Add Dropdown"
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
        <GenericMasterTable<DropdownTableType>
          data={transformedData}
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
                onClick={() => handleEdit(item?.masterId ?? "")}
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

export default DropdownMaster;
