import TextComponent from "../../Components/Atoms/TextComponent";
import { useNavigate } from "react-router-dom";
import {
  FUNDING_KEY,
  FUNDING_URL,
  headers,
  PrefundingTableType,
} from "../../Config/Funding/preFundingConfig";
import { useEffect, useState } from "react";
import GenericMasterToolbar from "../../Components/Organisms/GenericMasterToolbar";
import GenericMasterTable from "../../Components/Organisms/GenericMasterTable";
import { EyeIcon } from "../../assets/Icons";
import { exportToCsv, pageSizeSelectData } from "../../Utils/utils";
import { toast } from "react-toastify";
import {
  resetSingleFundingData,
  SelectFundingMeta,
  setPagination,
} from "../../Redux/Features/Fundings/slice";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { fetchFundingList } from "../../Redux/Features/Fundings/thunks";
import ShimmerTableRows from "../../Components/Atoms/ShimmerTableRows";

const PreFundingAuth = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const meta = useAppSelector(SelectFundingMeta(FUNDING_KEY));
  const pagination = meta?.pagination || {
    pageSize: 5,
    currentPage: 1,
    totalPages: 0,
    totalElements: 0,
  };
  const currentPage = pagination.currentPage;
  const pageSize = pagination.pageSize;

  const [data, setData] = useState<PrefundingTableType[]>([]);
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
    navigate(`/funding/authorization/edit/${id}`, { state: id });
  };

  const handleFilterChange = (key: string, value: any) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }));
  };

  const setPage = (page: number) => {
    if (page !== currentPage) {
      dispatch(
        setPagination({
          key: FUNDING_KEY,
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
        key: FUNDING_KEY,
        pagination: { ...pagination, currentPage: 1, pageSize: size },
      })
    );
  };

  const handleFilterSubmit = (key: string, value: any) => {
    dispatch(
      setPagination({
        key: FUNDING_KEY,
        pagination: { ...pagination, currentPage: 1, pageSize: 5 },
      })
    );
    setSubmittedFilter({ key, value });
  };

   const handleExportClick = () => {
    setData((current) => {
      if (!current || current.length === 0) {
        toast.warning("No data available to export.");
        return current;
      }
      exportToCsv(current, "Schemes");
      return current
    })
  };

  const handleToggleColumn = (key: string) => {
    setVisibleColumns((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleRefresh = () => {
    dispatch(resetSingleFundingData(FUNDING_KEY));
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
          fetchFundingList({
            key: FUNDING_KEY,
            url: `${FUNDING_URL}/all`,
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
      <TextComponent fontSize={22} fontFamily="Inter" fontWeight={600}>
        Prefunding Request
      </TextComponent>

      {/* Toolbar */}
      <GenericMasterToolbar
        headers={headers}
        onRefresh={handleRefresh}
        onColumnChange={handleToggleColumn}
        onExport={handleExportClick}
        onFilter={() => setFilterVisible((prev) => !prev)}
        visibleColumns={visibleColumns}
        loading={loading}
        error={error ? error.toString() : null}
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
          renderExtraHeader={() => <>Action</>} // empty header for action column/>
          renderExtraRowCell={(item) => (
            <div className="flex justify-center gap-2">
              <span
                onClick={() => handleEdit(String(item?.id ?? ""))}
                className="cursor-pointer"
              >
                <EyeIcon />
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

export default PreFundingAuth;
