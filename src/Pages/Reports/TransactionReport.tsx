import TextComponent from "../../Components/Atoms/TextComponent";
import { Form, Formik } from "formik";
import { Grid, Loader } from "@mantine/core";
import FormikSelectComponent from "../../Components/Molecules/FormikSelectComponent";
import FormikDateRangePicker from "../../Components/Molecules/FormikDateRangePicker";
import { IconCalendar } from "@tabler/icons-react";
import { useHierarchySubHierarchy } from "../../Utils/hooks/useHierarchySubHierarchy";
import ButtonComponent from "../../Components/Atoms/ButtonComponent";
import { headers, initialValues, TransactionReportSchema, TransactionReportTableType, transformToTransactionReportPayload, TRANX_REPORT_KEY, TRANX_REPORT_URL } from "../../Config/Reports/TransactionReportConfig";
import { useThrottledFormSubmit } from "../../Utils/hooks/useThrottleFormSubmit";
import GenericMasterTable from "../../Components/Organisms/GenericMasterTable";
import ShimmerTableRows from "../../Components/Atoms/ShimmerTableRows";
import { useEffect, useRef, useState } from "react";
import { exportToCsv, pageSizeSelectData } from "../../Utils/utils";
import GenericMasterToolbar from "../../Components/Organisms/GenericMasterToolbar";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../Redux/hooks";
import { resetMaster, setPagination } from "../../Redux/Features/Masters/MastersSlice";
import { useProductSubProduct } from "../../Utils/hooks/useProductSubProduct";
import { RefreshIcon } from "../../assets/Icons";
import { useFetchMasterList } from "../../Utils/hooks/useFetchMasterList";
import { colors } from "../../theme/colors";

const TransactionReport = () => {
  const dispatch = useAppDispatch();
  const [payload, setPayload] = useState<any>(null);

  const dataRef = useRef<TransactionReportTableType[] | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    headers.map((h) => h.key as string)
  );
  const [filterVisible, setFilterVisible] = useState(false);
  const [filterValues, setFilterValues] = useState<Record<string, any>>({});
  const [submittedFilter, setSubmittedFilter] = useState<Record<string, any> | null>(null);

  const [viewSubmitted, setViewSubmitted] = useState(false);

  const { data, loading, pagination, error, setPage, setPageSize } =
    useFetchMasterList<TransactionReportTableType>({
      method: "POST",
      key: TRANX_REPORT_KEY,
      url: viewSubmitted ? `${TRANX_REPORT_URL}/view` : undefined,
      payload,
      refreshKey,
    });


  const throttledSubmit = useThrottledFormSubmit((values: any) => {
    setPayload(() => ({
      ...transformToTransactionReportPayload(values), // top filters
      ...(submittedFilter || {}),                      // 🔴 keep inline filters
    }));
    // setRefreshKey((prev) => prev + 1);
    setViewSubmitted(true);
  }, 3000);

  const handleExportClick = () => {
    const currentData = dataRef.current;
    if (!currentData || currentData.length === 0) {
      toast.warning("No data available to export.");
      return;
    }
    exportToCsv(currentData, "Transaction-report");
  };

  const handleToggleColumn = (key: string) => {
    setVisibleColumns((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleToggleAllColumns = (selectAll: boolean) => {
    if (selectAll) {
      setVisibleColumns(headers.map((h) => h.key as string));
    } else {
      setVisibleColumns([]);
    }
  };

  const handleRefresh = () => {
    // Reset redux pagination / master state
    dispatch(resetMaster(TRANX_REPORT_KEY));

    // Reset table view state
    setVisibleColumns(headers.map((h) => h.key as string));
    setFilterVisible(false);
    setFilterValues({});
    setSubmittedFilter(null);

    setPayload(transformToTransactionReportPayload(initialValues));

    setRefreshKey((prev) => prev + 1);
  };

  const handleFilterChange = (key: string, value: any) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleFilterSubmit = (key: string, value: any) => {
    dispatch(
      setPagination({
        key: TRANX_REPORT_KEY,
        pagination: { ...pagination, currentPage: 1, pageSize: pagination.pageSize },
      })
    );
    setSubmittedFilter((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  useEffect(() => {
    if (submittedFilter) {
      setPayload((prev: any) => ({ ...prev, ...submittedFilter }));
    }
  }, [submittedFilter])

  return (
    <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col">
      <TextComponent fontSize={22} fontFamily="Inter" fontWeight={600}>
        Transaction Report
      </TextComponent>

      <GenericMasterToolbar
        onRefresh={handleRefresh}
        onColumnChange={handleToggleColumn}
        onToggleAll={handleToggleAllColumns}
        onExport={handleExportClick}
        onFilter={() => setFilterVisible((prev) => !prev)}
        headers={headers}
        visibleColumns={visibleColumns}
        loading={loading}
        error={error ? error.toString() : null}
      />

      <Formik
        key={refreshKey}
        initialValues={initialValues}
        validationSchema={TransactionReportSchema}
        onSubmit={(values) => {
          throttledSubmit(values)
        }}
      >
        {({ values, setFieldValue }) => {

          const { productDropdownData, loadingProductList, refetchProducts } = useProductSubProduct({});

          const { hierarchyList, loadingHierarchyList, subHierarchyList, loadingSubHierarchyList, subHierarchyKey } = useHierarchySubHierarchy({
            selectedHierarchyCode: values.hierarchy,
            onSubHierarchyReset: () => setFieldValue("subHierarchy", "")
          })

          return (
            <Form className="flex flex-col gap-2 mt-1">
              <Grid gutter="sm">

                <Grid.Col span={{ base: 5, md: 3, lg: 2.5 }}>
                  <FormikDateRangePicker
                    name="dateRange"
                    label="Date Range"
                    placeholder="Select Date Range"
                    size="xs"
                    shortcuts
                    required
                    leftIcon={<IconCalendar size={16} />}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 3, md: 2, lg: 1.5 }}>
                  <FormikSelectComponent
                    name="productId"
                    label="Product"
                    placeholder="Select Product"
                    size="xs"
                    // withAsterisk
                    // required
                    allowDeselect={true}
                    searchable={true}
                    data={productDropdownData}
                    disabled={loadingProductList}
                    rightSection={
                      <>
                        {loadingProductList && (
                          <Loader size={14} color="blue" />
                        )}
                        {!loadingProductList && productDropdownData.length < 1 && (
                          <div
                            onClick={refetchProducts}
                            className="cursor-pointer"
                            style={{ pointerEvents: "auto", display: "flex", alignItems: "center" }}
                            title="Refresh Products"
                          >
                            <RefreshIcon />
                          </div>
                        )}
                      </>
                    }
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 4, md: 2, lg: 1.5 }}>
                  <FormikSelectComponent
                    name="hierarchy"
                    size="xs"
                    label="Hierarchy"
                    allowDeselect={true}
                    searchable={true}
                    placeholder="Select Hierarchy Type"
                    nothingFoundMessage="Nothing Found"
                    data={hierarchyList}
                    disabled={loadingHierarchyList}
                  // withAsterisk
                  // required
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 5, md: 3, lg: 2 }}>
                  <FormikSelectComponent
                    key={subHierarchyKey}
                    name="subHierarchy"
                    size="xs"
                    label="Hierarchy ID"
                    allowDeselect={true}
                    searchable={true}
                    nothingFoundMessage="Nothing Found"
                    placeholder="Select Hierarchy ID"
                    data={subHierarchyList?.map((item: any) => ({
                      label: item.displayName,
                      value: String(item.id),
                    }))}
                    disabled={loadingSubHierarchyList}
                  // withAsterisk
                  // required
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 2, md: 2, lg: 1.5 }}>
                  <FormikSelectComponent
                    name="walletType"
                    size="xs"
                    // required
                    // withAsterisk
                    allowDeselect={true}
                    nothingFoundMessage="Nothing Found"
                    label="Wallet Type"
                    placeholder="Select Wallet Type"
                    data={[
                      { label: "PREPAID", value: "PREPAID" },
                      { label: "POSTPAID", value: "POSTPAID" },
                    ]}
                  />
                </Grid.Col>

                <Grid.Col span="auto">
                  <div className="flex justify-end items-center mt-4">
                    {<ButtonComponent
                      fontSize="14"
                      fullWidth={false}
                      radius={6}
                      size="sm"
                      borderColor={colors.text.inverse}
                      variant="filled"
                      type="submit"
                      bgColor={colors.brand.primary}
                      textColor={colors.text.inverse}
                    >
                      VIEW
                    </ButtonComponent>}
                  </div>
                </Grid.Col>
              </Grid>
            </Form>
          )
        }}
      </Formik>

      {loading ? (
        // Render shimmer
        <ShimmerTableRows rowCount={6} columnCount={headers.length} />
      ) : (
        <GenericMasterTable<TransactionReportTableType>
          data={data}
          headers={headers.filter((h) =>
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
          filterVisible={filterVisible}
          filterValues={filterValues}
          onFilterChange={handleFilterChange}
          onFilterSubmit={handleFilterSubmit}
        />
      )}
    </div>
  );
};

export default TransactionReport;
