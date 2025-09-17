import { useEffect, useRef, useState } from "react";
import TextComponent from "../../Components/Atoms/TextComponent";
import { EditIcon } from "../../assets/Icons";
import { useAppDispatch } from "../../Redux/hooks";
// import { resetSingleSchemesData, setPagination } from "../../Redux/Features/Schemes/slice";
import { toast } from "react-toastify";
import { exportToCsv, pageSizeSelectData } from "../../Utils/utils";
import GenericMasterToolbar from "../../Components/Organisms/GenericMasterToolbar";
import ShimmerTableRows from "../../Components/Atoms/ShimmerTableRows";
import GenericMasterTable from "../../Components/Organisms/GenericMasterTable";
import { headers, mapToSchemeHierarchyTableType, SCHEMES_HIERARCHY_KEY, SCHEMES_HIERARCHY_URL, SchemesHierarchyTableType } from "../../Config/Schemes/SchemesHierarchyConfig";
import { useFetchMasterList } from "../../Utils/hooks/useFetchMasterList";
import { useNavigate } from "react-router-dom";
import { resetMaster, setPagination } from "../../Redux/Features/Masters/MastersSlice";

const SchemeHierarchy = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [filterVisible, setFilterVisible] = useState(false);
    const [filterValues, setFilterValues] = useState<Record<string, any>>({});
    const [refreshKey, setRefreshKey] = useState(0);
    const [visibleColumns, setVisibleColumns] = useState<string[]>(
        headers.map((h) => h.key as string)
    );
    const dataRef = useRef<SchemesHierarchyTableType[] | null>(null);

    const [submittedFilter, setSubmittedFilter] = useState<Record<string, any> | null>(null);


    const { data, loading, error, pagination, setPage, setPageSize } =
        useFetchMasterList<SchemesHierarchyTableType>({
            key: SCHEMES_HIERARCHY_KEY,
            url: `${SCHEMES_HIERARCHY_URL}/getAll`,
            transformDataFn: mapToSchemeHierarchyTableType,
            filter: submittedFilter,
            refreshKey,
            defaultPageSize: 5
        });

    const handleEdit = (id: any) => {
        navigate(`/schemes/hierarchy/edit/${id}`, { state: id });
    };

    const handleAdd = () => {
        navigate("/schemes/hierarchy/add");
    };

    const handleFilterChange = (key: string, value: any) => {
        setFilterValues((prev) => ({ ...prev, [key]: value }));
    };

    const handleFilterSubmit = (key: string, value: any) => {
        dispatch(
            setPagination({
                key: SCHEMES_HIERARCHY_KEY,
                pagination: { ...pagination, currentPage: 1, pageSize: 5 },
            })
        );
        setSubmittedFilter({ [key]: value });
    };

    const handleExportClick = () => {
        const currentData = dataRef.current;
        if (!currentData || currentData.length === 0) {
            toast.warning("No data available to export.");
            return;
        }
        exportToCsv(currentData, "SCHEMES HEIRARCHY");
    };

    const handleToggleColumn = (key: string) => {
        setVisibleColumns((prev) =>
            prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
        );
    };

    const handleRefresh = () => {
        dispatch(resetMaster(SCHEMES_HIERARCHY_KEY));
        setFilterValues({});
        setSubmittedFilter(null);
        setVisibleColumns(headers.map((h) => h.key as string));
        setRefreshKey((prev) => prev + 1);
        setFilterVisible(false);
    };

    useEffect(() => {
        dataRef.current = data;
    }, [data]);

    return (
        <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col">
            {/* Heading */}
            <TextComponent fontSize={22} fontFamily="Inter" fontWeight={600}>
                Schemes Heirarchy
            </TextComponent>

            {/* Toolbar */}
            <GenericMasterToolbar
                addButtonText="Add Heirarchy"
                onAdd={handleAdd}
                headers={headers}
                onRefresh={handleRefresh}
                onColumnChange={handleToggleColumn}
                onExport={handleExportClick}
                onFilter={() => setFilterVisible((prev) => !prev)}
                visibleColumns={visibleColumns}
                loading={loading}
                error={error ? error.toString() : null}
            />

            {/*Table */}
            {loading ? (
                // Render shimmer
                <ShimmerTableRows rowCount={6} columnCount={headers.length} />
            ) : (
                <GenericMasterTable<SchemesHierarchyTableType>
                    data={data}
                    headers={headers.filter((h) =>
                        visibleColumns.includes(h.key as string)
                    )}
                    renderExtraHeader={() => <></>} // empty header for action column/>
                    renderExtraRowCell={(item) => (
                        <div className="flex justify-center gap-2 min-w-10 ">
                            {/* <span className="cursor-pointer">
                                <EyeIcon2 />
                            </span> */}
                            <span
                                onClick={() => handleEdit(item.id)}
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
                    filterVisible={filterVisible}
                    filterValues={filterValues}
                    onFilterChange={handleFilterChange}
                    onFilterSubmit={handleFilterSubmit}
                />
            )}
        </div>
    );
};

export default SchemeHierarchy;
