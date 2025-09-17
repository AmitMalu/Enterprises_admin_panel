import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { makeSelectMasterMeta, resetMaster, setPagination } from "../../Redux/Features/Masters/MastersSlice";
import { headers, SCHEMES_ALLOCATION_KEY, SCHEMES_ALLOCATION_URL, SchemesAllocationTableType } from "../../Config/Schemes/SchemesAllocationConfig";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import { exportToCsv, pageSizeSelectData } from "../../Utils/utils";
import { fetchMasterList } from "../../Redux/Features/Masters/MastersThunk";
import TextComponent from "../../Components/Atoms/TextComponent";
import GenericMasterToolbar from "../../Components/Organisms/GenericMasterToolbar";
import ShimmerTableRows from "../../Components/Atoms/ShimmerTableRows";
import GenericMasterTable from "../../Components/Organisms/GenericMasterTable";
import { EditIcon } from "../../assets/Icons";
import debounce from "lodash.debounce";

const SchemeAllocation = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const meta = useAppSelector(makeSelectMasterMeta(SCHEMES_ALLOCATION_KEY));
    const pagination = meta?.pagination || {
        pageSize: 10,
        currentPage: 1,
        totalPages: 0,
        totalElements: 0,
    };

    const currentPage = pagination.currentPage;
    const pageSize = pagination.pageSize;

    const [data, setData] = useState<SchemesAllocationTableType[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [search, setSearch] = useState("")
    const debouncedSearchValueRef = useRef<string>("");

    const [refreshKey, setRefreshKey] = useState(0);
    const [visibleColumns, setVisibleColumns] = useState<string[]>(
        headers.map((h) => h.key as string)
    );

    const handleEdit = (id: any) => {
        navigate(`/schemes/allocation/edit/${id}`, { state: id });
    }

    const debouncedSearch = useMemo(
        () =>
            debounce((val: string) => {
                debouncedSearchValueRef.current = val;
                fetchData();
            }, 500),
        []
    );

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVal = e.target.value;
        setSearch(newVal); // update input instantly
        debouncedSearch(newVal); // debounce actual action (e.g. API call)
    };

    const setPage = (page: number) => {
        if (page !== currentPage) {
            dispatch(
                setPagination({
                    key: SCHEMES_ALLOCATION_KEY,
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
                key: SCHEMES_ALLOCATION_KEY,
                pagination: { ...pagination, currentPage: 1, pageSize: size },
            })
        );
    };

    const handleExportClick = () => {
        setData((current) => {
            if (!current || current.length === 0) {
                toast.warning("No data available to export.");
                return current;
            }
            exportToCsv(current, "Schemes Allocation");
            return current
        })
    };

    const handleToggleColumn = (key: string) => {
        setVisibleColumns((prev) =>
            prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
        );
    };

    const handleRefresh = () => {
        setSearch("")
        debouncedSearchValueRef.current = ""
        dispatch(resetMaster(SCHEMES_ALLOCATION_KEY));
        setVisibleColumns(headers.map((h) => h.key as string));
        setRefreshKey((prev) => prev + 1);
    };

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await dispatch(
                fetchMasterList({
                    key: SCHEMES_ALLOCATION_KEY,
                    url: `${SCHEMES_ALLOCATION_URL}/active-retailers`,
                    page: currentPage,
                    size: pageSize,
                    filter: { keyword: debouncedSearchValueRef.current },
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

    useEffect(() => {
        fetchData();
    }, [currentPage, pageSize, refreshKey]);

    useEffect(() => {
        // Cleanup on unmount
        return () => debouncedSearch.cancel();
    }, [debouncedSearch]);

    return (
        <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col">
            {/* Heading */}
            <TextComponent fontSize={22} fontFamily="Inter" fontWeight={600}>
                Schemes Allocation
            </TextComponent>

            {/* Toolbar */}
            <GenericMasterToolbar
                headers={headers}
                onRefresh={handleRefresh}
                onColumnChange={handleToggleColumn}
                onExport={handleExportClick}
                onSearch={handleSearchChange}
                searchValue={search}
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
                    renderExtraHeader={() => <></>} // empty header for action column/>
                    renderExtraRowCell={(item) => (
                        <div className="flex justify-center gap-2 min-w-10">
                            <span
                                onClick={() => handleEdit(item.hierarchyId)}
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
                />
            )}
        </div>
    )
}

export default SchemeAllocation
