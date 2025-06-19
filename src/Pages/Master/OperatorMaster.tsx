import { useEffect, useState } from "react";
import { EditIcon, EyeIcon } from "../../assets/Icons";
import TextComponent from "../../Components/Atoms/TextComponent";
import { useNavigate } from "react-router-dom";
import GenericMasterTable from "../../Components/Organisms/GenericMasterTable";
import GenericMasterToolbar from "../../Components/Organisms/GenericMasterToolbar";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { fetchOperator } from "../../Redux/Features/Masters/OperatorMaster/thunks";
import { mapToOperatorTableType } from "../../Redux/Features/Masters/OperatorMaster/utils";
import ShimmerTableRows from "../../Components/Atoms/ShimmerTableRows";
import { headers, OperatorTableType } from "../../Config/Master/OperatorConfig";
import { toast } from "react-toastify";
import {
  resetAllStates,
  setCurrentPage,
  setLoaded,
  setPageSize,
} from "../../Redux/Features/Masters/OperatorMaster/slice";
import { exportToCsv, pageSizeSelectData } from "../../Utils/utils";

const OperatorMaster = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, operators, pagination, loaded } = useAppSelector(
    (state) => state.masters.operator
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

  const transformedData: OperatorTableType[] = operators?.map(
    mapToOperatorTableType
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
    navigate(`/master/operator-master/edit/${id}`, { state: id });
  };

  const handleAdd = () => {
    navigate("/master/operator-master/add");
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

    exportToCsv(transformedData, "operator-master");
  };

  useEffect(() => {
    dispatch(
      fetchOperator({
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
        Operator Master
      </TextComponent>

      <GenericMasterToolbar
        addButtonText="Add Operator"
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
        <GenericMasterTable<OperatorTableType>
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

export default OperatorMaster;
