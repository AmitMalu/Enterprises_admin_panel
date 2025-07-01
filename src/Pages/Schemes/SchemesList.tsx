import { useEffect, useState } from "react";
import TextComponent from "../../Components/Atoms/TextComponent";
import { DeleteIcon, EditIcon2, EyeIcon2, SettingIcon2 } from "../../assets/Icons";
import { headers, SCHEMES_KEY, SCHEMES_URL, SchemesListTableType } from "../../Config/Schemes/SchemesConfig";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { resetSingleSchemesData, SelectSchemesMeta, setPagination } from "../../Redux/Features/Schemes/slice";
import { toast } from "react-toastify";
import { exportToCsv, pageSizeSelectData } from "../../Utils/utils";
import { fetchSchemesList } from "../../Redux/Features/Schemes/thunks";
import GenericMasterToolbar from "../../Components/Organisms/GenericMasterToolbar";
import ShimmerTableRows from "../../Components/Atoms/ShimmerTableRows";
import GenericMasterTable from "../../Components/Organisms/GenericMasterTable";

const SchemesList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const meta = useAppSelector(SelectSchemesMeta(SCHEMES_KEY));
  const pagination = meta?.pagination || {
    pageSize: 5,
    currentPage: 1,
    totalPages: 0,
    totalElements: 0,
  };
  const currentPage = pagination.currentPage;
  const pageSize = pagination.pageSize;

  const [data, setData] = useState<SchemesListTableType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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

  const handleEdit = (id: any) => {
    navigate(`/schemes/edit/${id}`, { state: id });
  };

  const handleAdd = () => {
    navigate("/schemes/add");
  };

  const handleSetting = (id: any) => {
    // navigate(`/schemes/edit/${id}`, { state: id });
  };

  const handleDelete = (id: any) => {
    // navigate("/schemes/add/");
  };

  const handleFilterChange = (key: string, value: any) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }));
  };

  const setPage = (page: number) => {
    if (page !== currentPage) {
      dispatch(
        setPagination({
          key: SCHEMES_KEY,
          pagination: {
            ...pagination,
            currentPage: page,
          },
        })
      );
    }
  };

  const setPageSize = (size: number) => {
    dispatch(
      setPagination({
        key: SCHEMES_KEY,
        pagination: { ...pagination, currentPage: 1, pageSize: size },
      })
    );
  };

  const handleFilterSubmit = (key: string, value: any) => {
    dispatch(
      setPagination({
        key: SCHEMES_KEY,
        pagination: { ...pagination, currentPage: 1, pageSize: 5 },
      })
    );
    setSubmittedFilter({ key, value });
  };

  const handleExportClick = () => {
    if (!data || data.length === 0) {
      toast.warning("No data available to export.");
      return;
    }
    exportToCsv(data, "Schemes");
  };

  const handleToggleColumn = (key: string) => {
    setVisibleColumns((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleRefresh = () => {
    dispatch(resetSingleSchemesData(SCHEMES_KEY));
    setFilterValues({});
    setSubmittedFilter(null);
    setVisibleColumns(headers.map((h) => h.key as string));
    setRefreshKey((prev) => prev + 1);
    setFilterVisible(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await dispatch(
          fetchSchemesList({
            key: SCHEMES_KEY,
            url: `${SCHEMES_URL}`,
            page: currentPage,
            size: pageSize,
            filter: submittedFilter,
          })
        ).unwrap();

        setData(response);
      } catch (err: any) {
        toast.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, pageSize, refreshKey, submittedFilter]);

  return (
    <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col">
      {/* Heading */}
      <TextComponent fontSize={22} fontFamily="Manrope" fontWeight={500}>
        Schemes List
      </TextComponent>

      {/* Toolbar */}
      <GenericMasterToolbar
        addButtonText="Add Schemes"
        onAdd={handleAdd}
        headers={headers}
        onRefresh={handleRefresh}
        onColumnChange={handleToggleColumn}
        onExport={handleExportClick}
        onFilter={() => setFilterVisible((prev) => !prev)}
        visibleColumns={visibleColumns}
      />

      {/* PreFunding Table */}
      {loading ? (
        // Render shimmer
        <ShimmerTableRows rowCount={6} columnCount={headers.length} />
      ) : (
        <GenericMasterTable
          data={data}
          headers={headers.filter((h) =>
            visibleColumns.includes(h.key as string)
          )}
          renderExtraHeader={() => <></>} // empty header for action column/>
          renderExtraRowCell={(item) => (
            <div className="flex justify-center gap-2 ">
              <span
                onClick={() => handleSetting(item.id)}
                className="cursor-pointer"
              >
                <SettingIcon2 />
              </span>
              <span className="cursor-pointer">
                <EyeIcon2 />
              </span>
              <span
                onClick={() => handleDelete(item.id)}
                className="cursor-pointer">
                <DeleteIcon />
              </span>
              <span
                onClick={() => handleEdit(item.id)}
                className="cursor-pointer"
              >
                <EditIcon2 />
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

export default SchemesList;
